import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import {
  House,
  Users,
  PaperPlaneTilt,
  Trash,
  MagnifyingGlass,
  Funnel,
  CaretLeft,
  CaretRight,
  Check,
  X,
  Envelope,
  ChartBar,
  Copy,
  PencilSimple,
  ClockCounterClockwise,
  TrendUp,
} from "@phosphor-icons/react";
import { Moon, Sun, Cloud } from "lucide-react";
import { Half2Icon } from "@radix-ui/react-icons";
import { useTheme } from "../context/ThemeContext";
import siteConfig from "../config/siteConfig";

// Helper to format timestamps
function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Get theme icon based on current theme
function getThemeIcon(theme: string) {
  switch (theme) {
    case "dark":
      return <Moon size={18} />;
    case "light":
      return <Sun size={18} />;
    case "tan":
      return <Half2Icon width={18} height={18} />;
    case "cloud":
      return <Cloud size={18} />;
    default:
      return <Sun size={18} />;
  }
}

type FilterType = "all" | "subscribed" | "unsubscribed";
type ViewMode =
  | "subscribers"
  | "send-post"
  | "write-email"
  | "recent-sends"
  | "email-stats";

export default function NewsletterAdmin() {
  const { theme, toggleTheme } = useTheme();

  // View mode state - controls what shows in main area
  const [viewMode, setViewMode] = useState<ViewMode>("subscribers");

  // Subscriber list state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Send post state
  const [selectedPost, setSelectedPost] = useState<string>("");

  // Write email state
  const [customSubject, setCustomSubject] = useState("");
  const [customContent, setCustomContent] = useState("");

  // Shared send state
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const [sendResult, setSendResult] = useState<{
    success: boolean;
    message: string;
    command?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Check if admin is enabled
  if (!siteConfig.newsletterAdmin?.enabled) {
    return (
      <div className="newsletter-admin-disabled">
        <h1>Newsletter Admin</h1>
        <p>Newsletter admin is disabled in site configuration.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Queries
  const subscribersData = useQuery(api.newsletter.getAllSubscribers, {
    limit: 20,
    cursor,
    filter,
    search: search || undefined,
  });

  const stats = useQuery(api.newsletter.getNewsletterStats);
  const postsForNewsletter = useQuery(api.newsletter.getPostsForNewsletter);

  // Mutations
  const deleteSubscriber = useMutation(api.newsletter.deleteSubscriber);
  const scheduleSendPost = useMutation(
    api.newsletter.scheduleSendPostNewsletter,
  );
  const scheduleSendCustom = useMutation(
    api.newsletter.scheduleSendCustomNewsletter,
  );

  // Handle view mode change
  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    setSendResult(null); // Clear results when switching views
  }, []);

  // Handle search with debounce
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCursor(undefined); // Reset pagination on search
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
    setCursor(undefined); // Reset pagination on filter change
  }, []);

  // Handle delete subscriber
  const handleDelete = useCallback(
    async (subscriberId: Id<"newsletterSubscribers">) => {
      const result = await deleteSubscriber({ subscriberId });
      if (result.success) {
        setDeleteConfirm(null);
      }
    },
    [deleteSubscriber],
  );

  // Handle send post newsletter
  const handleSendPostNewsletter = useCallback(async () => {
    if (!selectedPost) return;

    setSendingNewsletter(true);
    setSendResult(null);
    setCopied(false);

    try {
      const result = await scheduleSendPost({
        postSlug: selectedPost,
        siteUrl: window.location.origin,
        siteName: siteConfig.name,
      });

      const command = `npm run newsletter:send ${selectedPost}`;
      setSendResult({
        success: result.success,
        message: result.message,
        command: result.success ? command : undefined,
      });
    } catch {
      setSendResult({
        success: false,
        message: "Failed to send newsletter. Check console for details.",
      });
    } finally {
      setSendingNewsletter(false);
    }
  }, [selectedPost, scheduleSendPost]);

  // Handle send custom newsletter
  const handleSendCustomNewsletter = useCallback(async () => {
    if (!customSubject.trim() || !customContent.trim()) return;

    setSendingNewsletter(true);
    setSendResult(null);
    setCopied(false);

    try {
      const result = await scheduleSendCustom({
        subject: customSubject,
        content: customContent,
        siteUrl: window.location.origin,
        siteName: siteConfig.name,
      });

      setSendResult({
        success: result.success,
        message: result.message,
      });

      // Clear form on success
      if (result.success) {
        setCustomSubject("");
        setCustomContent("");
      }
    } catch {
      setSendResult({
        success: false,
        message: "Failed to send newsletter. Check console for details.",
      });
    } finally {
      setSendingNewsletter(false);
    }
  }, [customSubject, customContent, scheduleSendCustom]);

  // Handle copy command to clipboard
  const handleCopyCommand = useCallback(async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = command;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  // Pagination handlers
  const handleNextPage = useCallback(() => {
    if (subscribersData?.nextCursor) {
      setCursor(subscribersData.nextCursor);
    }
  }, [subscribersData?.nextCursor]);

  const handlePrevPage = useCallback(() => {
    setCursor(undefined); // Reset to first page
  }, []);

  // Get main area title based on view mode
  const getMainTitle = () => {
    switch (viewMode) {
      case "subscribers":
        return "Subscribers";
      case "send-post":
        return "Send Post";
      case "write-email":
        return "Write Email";
      case "recent-sends":
        return "Recent Sends";
      case "email-stats":
        return "Email Stats";
      default:
        return "Subscribers";
    }
  };

  // Render main content based on view mode
  const renderMainContent = () => {
    switch (viewMode) {
      case "subscribers":
        return renderSubscriberList();
      case "send-post":
        return renderSendPost();
      case "write-email":
        return renderWriteEmail();
      case "recent-sends":
        return renderRecentSends();
      case "email-stats":
        return renderEmailStats();
      default:
        return renderSubscriberList();
    }
  };

  // Render subscriber list
  const renderSubscriberList = () => (
    <>
      {/* Filter pills */}
      <div className="newsletter-admin-filter-bar">
        <Funnel size={16} />
        <span className="newsletter-admin-filter-label">
          {subscribersData?.totalCount ?? 0} results
        </span>
      </div>

      {/* Subscriber list */}
      <div className="newsletter-admin-list">
        {!subscribersData ? (
          <div className="newsletter-admin-loading">Loading subscribers...</div>
        ) : subscribersData.subscribers.length === 0 ? (
          <div className="newsletter-admin-empty">
            {search
              ? "No subscribers match your search."
              : "No subscribers yet."}
          </div>
        ) : (
          subscribersData.subscribers.map((subscriber) => (
            <div
              key={subscriber._id}
              className={`newsletter-admin-subscriber ${!subscriber.subscribed ? "unsubscribed" : ""}`}
            >
              <div className="newsletter-admin-subscriber-info">
                <span className="newsletter-admin-subscriber-email">
                  {subscriber.email}
                </span>
                <span className="newsletter-admin-subscriber-meta">
                  {subscriber.subscribed ? (
                    <span className="newsletter-admin-badge active">
                      Active
                    </span>
                  ) : (
                    <span className="newsletter-admin-badge inactive">
                      Unsubscribed
                    </span>
                  )}
                  <span className="newsletter-admin-subscriber-source">
                    via {subscriber.source}
                  </span>
                  <span className="newsletter-admin-subscriber-date">
                    {formatDate(subscriber.subscribedAt)}
                  </span>
                </span>
              </div>
              <div className="newsletter-admin-subscriber-actions">
                {deleteConfirm === subscriber._id ? (
                  <div className="newsletter-admin-delete-confirm">
                    <span>Delete?</span>
                    <button
                      onClick={() => handleDelete(subscriber._id)}
                      className="newsletter-admin-delete-yes"
                      title="Confirm delete"
                    >
                      <Check size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="newsletter-admin-delete-no"
                      title="Cancel"
                    >
                      <X size={16} weight="bold" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(subscriber._id)}
                    className="newsletter-admin-action-btn delete"
                    title="Delete subscriber"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {subscribersData && subscribersData.subscribers.length > 0 && (
        <div className="newsletter-admin-pagination">
          <button
            onClick={handlePrevPage}
            disabled={!cursor}
            className="newsletter-admin-pagination-btn"
          >
            <CaretLeft size={16} />
            First
          </button>
          <button
            onClick={handleNextPage}
            disabled={!subscribersData.nextCursor}
            className="newsletter-admin-pagination-btn"
          >
            Next
            <CaretRight size={16} />
          </button>
        </div>
      )}
    </>
  );

  // Render send post form
  const renderSendPost = () => (
    <div className="newsletter-admin-form-container full-width">
      <p className="newsletter-admin-form-desc">
        Select a blog post to send as a newsletter to all active subscribers.
      </p>

      <div className="newsletter-admin-form-group">
        <label className="newsletter-admin-label">Select Post</label>
        <select
          value={selectedPost}
          onChange={(e) => setSelectedPost(e.target.value)}
          className="newsletter-admin-select"
        >
          <option value="">Choose a post...</option>
          {postsForNewsletter?.map((post) => (
            <option key={post.slug} value={post.slug} disabled={post.wasSent}>
              {post.title} ({post.date}){post.wasSent ? " - SENT" : ""}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSendPostNewsletter}
        disabled={!selectedPost || sendingNewsletter}
        className="newsletter-admin-send-btn"
      >
        {sendingNewsletter ? (
          "Sending..."
        ) : (
          <>
            <PaperPlaneTilt size={16} />
            Send to Subscribers
          </>
        )}
      </button>

      {renderSendResult()}
    </div>
  );

  // Render write email form
  const renderWriteEmail = () => (
    <div className="newsletter-admin-form-container full-width">
      <p className="newsletter-admin-form-desc">
        Write a custom email to send to all active subscribers. Supports
        markdown formatting.
      </p>

      <div className="newsletter-admin-form-group">
        <label className="newsletter-admin-label">Subject</label>
        <input
          type="text"
          value={customSubject}
          onChange={(e) => setCustomSubject(e.target.value)}
          placeholder="Email subject line..."
          className="newsletter-admin-input"
        />
      </div>

      <div className="newsletter-admin-form-group">
        <label className="newsletter-admin-label">Content (Markdown)</label>
        <textarea
          value={customContent}
          onChange={(e) => setCustomContent(e.target.value)}
          placeholder="Write your email content here...

Supports markdown:
# Heading
**bold** and *italic*
[link text](url)
- list items"
          className="newsletter-admin-textarea"
          rows={12}
        />
      </div>

      <button
        onClick={handleSendCustomNewsletter}
        disabled={
          !customSubject.trim() || !customContent.trim() || sendingNewsletter
        }
        className="newsletter-admin-send-btn"
      >
        {sendingNewsletter ? (
          "Sending..."
        ) : (
          <>
            <PaperPlaneTilt size={16} />
            Send to Subscribers
          </>
        )}
      </button>

      {renderSendResult()}
    </div>
  );

  // Render recent sends (shows both post and custom emails)
  const renderRecentSends = () => (
    <div className="newsletter-admin-recent-container full-width">
      {!stats ? (
        <div className="newsletter-admin-loading">Loading recent sends...</div>
      ) : stats.recentNewsletters.length === 0 ? (
        <div className="newsletter-admin-empty">No newsletters sent yet.</div>
      ) : (
        <div className="newsletter-admin-recent-list-main">
          {stats.recentNewsletters.map((newsletter, index) => (
            <div
              key={`${newsletter.postSlug}-${index}`}
              className="newsletter-admin-recent-item-main"
            >
              <div className="newsletter-admin-recent-info">
                <span className="newsletter-admin-recent-slug-main">
                  {newsletter.type === "custom"
                    ? newsletter.subject || "Custom Email"
                    : newsletter.postSlug}
                </span>
                <span className="newsletter-admin-recent-meta-main">
                  {newsletter.type === "custom" ? (
                    <span className="newsletter-admin-badge-type custom">
                      Custom
                    </span>
                  ) : (
                    <span className="newsletter-admin-badge-type post">
                      Post
                    </span>
                  )}
                  Sent to {newsletter.sentCount} subscriber
                  {newsletter.sentCount !== 1 ? "s" : ""}
                </span>
              </div>
              <span className="newsletter-admin-recent-date">
                {formatDateTime(newsletter.sentAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render email stats
  const renderEmailStats = () => (
    <div className="newsletter-admin-email-stats full-width">
      {!stats ? (
        <div className="newsletter-admin-loading">Loading stats...</div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="newsletter-admin-stats-cards">
            <div className="newsletter-admin-stat-card">
              <div className="newsletter-admin-stat-card-icon">
                <PaperPlaneTilt size={24} />
              </div>
              <div className="newsletter-admin-stat-card-content">
                <span className="newsletter-admin-stat-card-value">
                  {stats.totalEmailsSent}
                </span>
                <span className="newsletter-admin-stat-card-label">
                  Total Emails Sent
                </span>
              </div>
            </div>
            <div className="newsletter-admin-stat-card">
              <div className="newsletter-admin-stat-card-icon">
                <Envelope size={24} />
              </div>
              <div className="newsletter-admin-stat-card-content">
                <span className="newsletter-admin-stat-card-value">
                  {stats.totalNewslettersSent}
                </span>
                <span className="newsletter-admin-stat-card-label">
                  Newsletters Sent
                </span>
              </div>
            </div>
            <div className="newsletter-admin-stat-card">
              <div className="newsletter-admin-stat-card-icon">
                <Users size={24} />
              </div>
              <div className="newsletter-admin-stat-card-content">
                <span className="newsletter-admin-stat-card-value">
                  {stats.activeSubscribers}
                </span>
                <span className="newsletter-admin-stat-card-label">
                  Active Subscribers
                </span>
              </div>
            </div>
            <div className="newsletter-admin-stat-card">
              <div className="newsletter-admin-stat-card-icon">
                <TrendUp size={24} />
              </div>
              <div className="newsletter-admin-stat-card-content">
                <span className="newsletter-admin-stat-card-value">
                  {stats.totalSubscribers > 0
                    ? Math.round(
                        (stats.activeSubscribers / stats.totalSubscribers) *
                          100,
                      )
                    : 0}
                  %
                </span>
                <span className="newsletter-admin-stat-card-label">
                  Retention Rate
                </span>
              </div>
            </div>
          </div>

          {/* Stats summary */}
          <div className="newsletter-admin-stats-summary">
            <h3>Summary</h3>
            <div className="newsletter-admin-stats-row">
              <span>Total Subscribers</span>
              <span>{stats.totalSubscribers}</span>
            </div>
            <div className="newsletter-admin-stats-row">
              <span>Active Subscribers</span>
              <span>{stats.activeSubscribers}</span>
            </div>
            <div className="newsletter-admin-stats-row">
              <span>Unsubscribed</span>
              <span>{stats.unsubscribedCount}</span>
            </div>
            <div className="newsletter-admin-stats-row">
              <span>Newsletters Sent</span>
              <span>{stats.totalNewslettersSent}</span>
            </div>
            <div className="newsletter-admin-stats-row">
              <span>Total Emails Sent</span>
              <span>{stats.totalEmailsSent}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // Render send result message
  const renderSendResult = () => {
    if (!sendResult) return null;

    return (
      <div
        className={`newsletter-admin-send-result ${sendResult.success ? "success" : "error"}`}
      >
        <span className="newsletter-admin-result-message">
          {sendResult.message}
        </span>
        {sendResult.command && (
          <div className="newsletter-admin-command-row">
            <code className="newsletter-admin-command">
              {sendResult.command}
            </code>
            <button
              onClick={() => handleCopyCommand(sendResult.command!)}
              className="newsletter-admin-copy-btn"
              title={copied ? "Copied!" : "Copy command"}
            >
              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="newsletter-admin-layout two-column">
      {/* Left Sidebar: Navigation and Stats */}
      <aside className="newsletter-admin-sidebar-left">
        <div className="newsletter-admin-sidebar-header">
          <Link
            to="/"
            className="newsletter-admin-logo-link"
            title="Back to home"
          >
            <House size={20} weight="regular" />
            <span>Home</span>
          </Link>
        </div>

        <nav className="newsletter-admin-nav">
          {/* Views section */}
          <div className="newsletter-admin-nav-section">
            <span className="newsletter-admin-nav-label">Views</span>
            <button
              onClick={() => {
                handleViewModeChange("subscribers");
                handleFilterChange("all");
              }}
              className={`newsletter-admin-nav-item ${viewMode === "subscribers" && filter === "all" ? "active" : ""}`}
            >
              <Users
                size={18}
                weight={
                  viewMode === "subscribers" && filter === "all"
                    ? "fill"
                    : "regular"
                }
              />
              <span>All Subscribers</span>
            </button>
            <button
              onClick={() => {
                handleViewModeChange("subscribers");
                handleFilterChange("subscribed");
              }}
              className={`newsletter-admin-nav-item ${viewMode === "subscribers" && filter === "subscribed" ? "active" : ""}`}
            >
              <Check
                size={18}
                weight={
                  viewMode === "subscribers" && filter === "subscribed"
                    ? "bold"
                    : "regular"
                }
              />
              <span>Active</span>
            </button>
            <button
              onClick={() => {
                handleViewModeChange("subscribers");
                handleFilterChange("unsubscribed");
              }}
              className={`newsletter-admin-nav-item ${viewMode === "subscribers" && filter === "unsubscribed" ? "active" : ""}`}
            >
              <X
                size={18}
                weight={
                  viewMode === "subscribers" && filter === "unsubscribed"
                    ? "bold"
                    : "regular"
                }
              />
              <span>Unsubscribed</span>
            </button>
          </div>

          {/* Send Newsletter section */}
          <div className="newsletter-admin-nav-section">
            <span className="newsletter-admin-nav-label">Send Newsletter</span>
            <button
              onClick={() => handleViewModeChange("send-post")}
              className={`newsletter-admin-nav-item ${viewMode === "send-post" ? "active" : ""}`}
            >
              <PaperPlaneTilt
                size={18}
                weight={viewMode === "send-post" ? "fill" : "regular"}
              />
              <span>Send Post</span>
            </button>
            <button
              onClick={() => handleViewModeChange("write-email")}
              className={`newsletter-admin-nav-item ${viewMode === "write-email" ? "active" : ""}`}
            >
              <PencilSimple
                size={18}
                weight={viewMode === "write-email" ? "fill" : "regular"}
              />
              <span>Write Email</span>
            </button>
          </div>

          {/* History section */}
          <div className="newsletter-admin-nav-section">
            <span className="newsletter-admin-nav-label">History</span>
            <button
              onClick={() => handleViewModeChange("recent-sends")}
              className={`newsletter-admin-nav-item ${viewMode === "recent-sends" ? "active" : ""}`}
            >
              <ClockCounterClockwise
                size={18}
                weight={viewMode === "recent-sends" ? "fill" : "regular"}
              />
              <span>Recent Sends</span>
            </button>
            <button
              onClick={() => handleViewModeChange("email-stats")}
              className={`newsletter-admin-nav-item ${viewMode === "email-stats" ? "active" : ""}`}
            >
              <ChartBar
                size={18}
                weight={viewMode === "email-stats" ? "fill" : "regular"}
              />
              <span>Email Stats</span>
            </button>
          </div>

          {/* Actions section */}
          <div className="newsletter-admin-nav-section">
            <span className="newsletter-admin-nav-label">Actions</span>
            <button onClick={toggleTheme} className="newsletter-admin-nav-item">
              {getThemeIcon(theme)}
              <span>Theme</span>
            </button>
          </div>
        </nav>

        {/* Stats section */}
        {stats && (
          <div className="newsletter-admin-stats">
            <div className="newsletter-admin-stat">
              <span className="newsletter-admin-stat-value">
                {stats.activeSubscribers}
              </span>
              <span className="newsletter-admin-stat-label">Active</span>
            </div>
            <div className="newsletter-admin-stat">
              <span className="newsletter-admin-stat-value">
                {stats.totalSubscribers}
              </span>
              <span className="newsletter-admin-stat-label">Total</span>
            </div>
            <div className="newsletter-admin-stat">
              <span className="newsletter-admin-stat-value">
                {stats.totalNewslettersSent}
              </span>
              <span className="newsletter-admin-stat-label">Sent</span>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="newsletter-admin-main">
        <div className="newsletter-admin-main-header">
          <h1 className="newsletter-admin-main-title">
            {viewMode === "subscribers" && (
              <Envelope size={24} weight="regular" />
            )}
            {viewMode === "send-post" && (
              <PaperPlaneTilt size={24} weight="regular" />
            )}
            {viewMode === "write-email" && (
              <PencilSimple size={24} weight="regular" />
            )}
            {viewMode === "recent-sends" && (
              <ClockCounterClockwise size={24} weight="regular" />
            )}
            {viewMode === "email-stats" && (
              <ChartBar size={24} weight="regular" />
            )}
            {getMainTitle()}
          </h1>

          {/* Search bar in header - only show for subscribers view */}
          {viewMode === "subscribers" && (
            <div className="newsletter-admin-search">
              <MagnifyingGlass size={18} />
              <input
                type="text"
                placeholder="Search by email..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="newsletter-admin-search-input"
              />
            </div>
          )}
        </div>

        {renderMainContent()}
      </main>
    </div>
  );
}
