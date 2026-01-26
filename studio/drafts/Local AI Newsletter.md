# Skills Stack: Local AI Newsletter Project

[00:00:00] 

[00:00:00] **Charlie Deist:** All right, everybody. Welcome to the inaugural episode of an experiment that I'm calling Skills Stack. Everybody's talking about what was once called Claude Skills when they first launched. Now they're being expanded out as a general protocol that is being embraced by open ai.

The actual protocol was transferred over to the Linux Foundation for, neutrality. You can think of Linux as kind of the Switzerland of technology, but what are these skills? How do they work? The problem with the way that people have been explaining skills is, ~~you know, ~~sort of like the parable of, ~~uh, ~~the blind man and the elephant where you ask, what is an elephant?

And, he feels ~~the, ~~the trunk. And he says, ~~oh, it's a, ~~it's like ~~a, you know, ~~a snake or something. And then he feels the. Leg and he says, ~~oh, it's a, ~~it's like the trunk of a tree ~~or something. And in reality, ~~our perception of skills is going to be informed by. The useful ways that we find to use them.

So for a programmer, they're gonna describe it in a certain way compared to somebody that's primarily a designer, might describe it a different way. I'm coming at it from the perspective of a content creator. ~~Primarily, ~~[00:01:00] I work as head of content for a company called ~~Open, uh, ~~open ad. Excuse me. I was gonna say open ai.

~~Uh, ~~I have not yet been hired by OpenAI, although they should be paying me for this stuff. It's gold. So what are skills from a content creation perspective? I think of them as kind of standard operating procedures. They're your personal instructions, your knowledge that get embedded in a modular way into your workspace so that in any chat that you're in, whether you're using the desktop version of Claude or chat, GBT.

Or if you're getting a little more advanced and using a tool like Cursor where you can ~~kind of ~~store all of your skills and see them, access them and edit them more easily, ~~uh, ~~that's my preferred way. And so I'm gonna show in this video, ~~uh, ~~a quick overview of how I use skills ~~and I'm, I'm, ~~I'm not gonna drop you into one of my existing workspaces, my ~~kind of ~~code repos or content repos ~~as it were, ~~because those are ~~two ~~too complicated.

I think to start with, I could show you very briefly. We could look here at my open-end vault. This is where I do ~~my, ~~my work. ~~And ~~you can see I've got a whole folder of skills here from [00:02:00] the cold open creator to the, ~~uh, ~~identity document, the blog post creator, the podcast production skill one that I'm particularly proud of.

This is a four checkpoint process that references a number of other skills. It gets my feedback at critical points in the process, but basically, ~~uh, ~~guides me through the process of my entire podcast workflow. We'll do that in a separate episode. What I wanna cover today is, ~~uh, ~~a little real time experiment I've had in mind for a long time ~~that wouldn't it be great if there was a local newsletter, uh uh.~~

Online and ~~you know, ~~an email newsletter for my little town. I live in a town with about 500 people. It's called Bangor, California. ~~You can look it up, but it's barely on the map. ~~All you've got is ~~basically ~~a stop sign ~~and there's ~~a feed store, a post office, and a little bodega. ~~Uh, and ~~inside the feed store and at the post office, you've got ~~these ~~bulletin boards.

~~So ~~here on the left you can see a sample picture. I took these pictures the other day ~~when I was rolling through. ~~I thought, wouldn't it be great if there was a local newsletter that functioned as a ~~kind of ~~business directory and you didn't have to stop into the feed store and scour every [00:03:00] little thing to see what was going on.

If you could get that kind of snapshot view, maybe once a week or once a month, combine with some personal interest stories, ~~and ~~we're gonna talk a little bit about my personal idea of having. A sort of sharing economy, a local sharing economy. Think Craigslist meets Airbnb. You know, I'll give you an example.

Right now we have this boar, that's BOAR, ~~uh, ~~and we're borrowing him. It's kind of a borrow a boar because you only need a boar for a brief window when you're trying to get your sow pregnant. In our case, we've got ~~a, actually ~~a gilt, which is a female pig that has not yet had a litter trying to get her pregnant.

Our friend Matt Aiken Zeor named Han Solo he's not trying to get his pigs pregnant, so he doesn't want to have this board year round.

~~Now, where am I going with this? ~~The idea is you have a ~~network ~~trust-based network where people can share things where it makes sense to share them. Similarly, we have a milk cow. We could have two milk cows if we had people to help us milk some of the time. But [00:04:00] milking seven days a week, we stop at one.

So the idea is grow this kind of community. And really what I want to do is imagine how are we going to use AI such that it has real world impact. We're not just creating more B2B software that's gonna be like the snake eating its own tail of We're trying to ~~actually ~~channel it toward human thriving ~~in the end. ~~And because I'm out here in the sticks, what better way than to create content, which is a strength of ai ~~and especially with skills.~~

That can benefit the local community. ~~So let's just pick up here. ~~Now, I started off in Gemini ~~and I just started ~~with the clean chat because the operation that I wanted to do here, a little experimental, but ~~let's just, ~~I just wanted to see if I give it these pictures, can it pick out, from this bulletin board, all the relevant information.

And it seemed to have done a pretty good job here. Unwanted vehicles. We got different things. This first one, what have we got? Sale firewood and ~~as ~~tamales. ~~What else? What else? Hold on. ~~Fresh and local eggs. ~~Okay, so, ~~we're going to, create this data set of everything on these bulletin boards, homemade [00:05:00] tamales, and i'm ~~just ~~gonna copy the contents ~~here ~~and ~~I'm gonna ~~create a new project for this whole project, and this is gonna be kind of the starting foundation now.

I did while I was doing this kind of capture a little bit more of the context around this project. ~~Uh, ~~but if we think about ~~what are sort of ~~the essential elements of a local newsletter, and if I'm trying to set up a project in which the content creation process will be as smooth as possible, there are a few elements that we're gonna need.

So that's what we're gonna do here in Cursor. And I'm gonna close outta this ~~open ed ~~and start a new ~~window, uh, a new project. And basically we say open ~~project. If you've never used Cursor before. It'll prompt you to pick a folder on your computer. Now, in this case, ~~uh, ~~we don't have a folder for this project yet, so I'm gonna create one and ~~I'm gonna ~~call it Bangor Bulletin.

That is the working title for now, and I'll ~~just ~~open it up. ~~And ~~now you'll see it opens up to the standard cursor view. Here we've got the cursor agent where we can run different models, ~~and ~~in different modes. Agent mode is ~~kind of ~~full permissions to change things in our code base. ~~And then ~~over here, this is our file [00:06:00] repo, I'm going to export this to a document. It's gonna put it into Google Docs to start, and then I'm gonna export it as a markdown document, just so you can see how files work inside of a workspace. So now I will download this as a markdown file.

Okay, good.

Okay, so here we go. Now I've got this document here and I could just start flowing and provide in the context. I've already given a bit of context into this document, and so I'm gonna go ahead and ask this to produce some sort of foundational documents here. ~~I'm gonna say, based on the conversation that we've had so far.~~

Based on the conversation that we've had so far, could you please create a document summarizing the overall vision and strategy, with sections on the style of voice, the long-term strategy and tactics,

as well as anything else that we might have talked about that I can't think of right now. So a fairly broad catchall type of prompt.

All right, and here we go. ~~We've got our basic pro our, ~~we've got our basic strategic roadmap and vision. It's calling it Axios for the Foothills. If [00:07:00] you know about Axios, they are a sort of franchise newsletter that exists in cities all across the country, very profitable business. I think they were sold for several million dollars.

Back in 2022, Axios, agreed to sell to Cox Enterprises for $525 million. So for those of you who think that media and content is not serious business. Think again, and especially when it comes to these ~~sort of ~~abandoned local markets, media is a huge opportunity and I'm betting on the fact that people in these rural areas want to be more connected to each other.

They want to know what's going on in their town. ~~Uh, ~~and this is one of the best ways to ~~sort of ~~network and bring about network effects at a local level. I trust that all of you watching have your own ideas about things that could be done in the real world ~~and. ~~It is one of my firmest convictions ~~that the~~ that AI is not contrary to popular opinion going to take your job unless you sit by idly and ~~you ~~don't go out looking for all these problems [00:08:00] that need to be solved.

All these things ~~that ~~can be done with this new technological overhang that makes things that would've been previously, too labor intensive. Just so much easier. You've already seen ~~that we took the uh, ~~that we took that bulletin board posting and converted it into organized data. ~~And ~~these are the kinds of things that AI excels at.

But it can do much more than that. That's just the most simple operation with a single prompt. When it comes to skills. We're gonna get much more advanced. So with this project roadmap, I can again export it to a doc. I want to get this into markdown format.

Now I wanna show you something here on the left hand pane. ~~Now ~~this is where you would normally have a code repo, ~~but ~~for those of you like me. Who do not have a coding background? ~~Uh, ~~what is a code repo? Well, it's a folder with files that live ~~lives ~~on your computer, and people will often dismiss Claude skills as it's just a markdown file in a folder.

You'll see what that means in a minute. ~~But ~~if that's true, then every program that you use started off as just folders on a computer. Basically, the code, there are sets of instructions written in [00:09:00] different programming languages that are stitched up and deployed. ~~Uh. ~~To the world, but at their root, ~~they are just folders.~~

They are just files in folders. So here we are, we've got the overarching folder of the Bangor Bulletin inside my folder of projects ~~here, ~~and ~~then ~~I've ~~just ~~got these two files. ~~So ~~I'm gonna call this product roadmap ~~slash strategy or underscore ~~strategy.

~~Alright. ~~Now, if you've never used Cursor before or any ~~of these ~~tools like Claude Code, I ~~would ~~recommend starting ~~off just ~~right here in this agent. However, if you're already ~~Claude Pilled, Claude Code ~~Pilled, and you're a pro subscriber or a Max subscriber, actually I think you have to be a Max subscriber to use Claude Code.

~~The way that I have it configured in, ~~the way that I have it configured in cursor is I have an extension, ~~uh, this is just. ~~Cursor is a VS. Code Fork and VS code has all these extensions. I go open up a Claude Code chat window here. I'm gonna cross out the Cursor agent because I don't need to pay for all those different subscriptions. And here we are.

I've got Claude Code right here inside of Cursor. ~~I'm gonna make it nice and big here. And ~~my typical architecture is my. Code [00:10:00] repo my documents on the left. Then I have the file that I'm viewing, and here it shows up as raw markdown. This is ~~un ~~unformatted, but with ~~this ex, another ~~extension that I'm using called markdown preview, I can ~~just ~~use a keyboard shortcut and turn it into this nice ~~ified ~~markdown.

Then over here we've got our agent. This is just like your chat, but you can kind of think if you've ever used the artifacts feature of Claude or the Canvas feature. Gemini, this here is your canvas. ~~It's, ~~it's any file, it's your artifacts. They just happen to live here on the side. You can edit any of them at any time or create a new version, but we're gonna start to play around with just these two files.

So for my first prompt, I'm gonna give it something very broad, ~~kind of make sure it's, ~~make sure everything's, ~~uh, ~~still connected. Then I'm logged in. I'm just gonna say. All right, let's go ahead and analyze this project. ~~Uh, I'm, ~~I have two files in the repo. One is a master list of all the bulletin board postings, and the other is a general [00:11:00] product roadmap and strategy.

Check it out and tell me what you think.

So we can see it's wibbling here. That just means thinking, ~~forging,~~

imagining

baking,

puttering. 

[00:11:11] **Charlie Deist-1:** Alright, ~~now ~~I stopped recording there for a second 'cause it was being slow. And then ~~of course ~~I forgot to ~~hit~~ start again on the recording. ~~So ~~I'm just gonna catch you up on what I've been doing here. We submitted that first prompt and ~~it went to work. ~~It got to work on a plan, created these four to do items, and then got to work on them.

~~Oops. So in the, ~~in the first analysis, it gives me its thoughts. It tells me about the strengths, thinks I've got a strong value proposition, and, ~~uh, ~~good goals. Maybe my long-term roadmap is a little bit ambitious and there are some gaps in the data and the naming is inconsistent. ~~So ~~this is great.

It gives me a sense of where I'm gonna go next, and I'm just gonna reply. I say, okay, no problem. We can defer the more ambitious elements of the roadmap. ~~To the future. ~~For now, I wanna start planning out a template for the newsletter, a replicable structure that we can use in the future, because that's gonna be what, saves me time [00:12:00] setting up a strong foundation here.

We should also look at the listing for things that seem like they might be newsworthy, noteworthy, that might have a little bit of content that seem like they could be adapted into new segments versus those. That are purely part of the business directory. Then let's make sure that we have the most orthogonal breakdown of categories for the directory.

When it comes to the naming, ~~uh, ~~help me brainstorm what makes sense given my goals. So it gives updates, the to-dos, and it starts working through them. It volunteers this newsletter template structure. It says, here's what might be newsworthy versus directory only. The orthogonal category breakdown. And this is because, ~~you know, ~~we wanna find the categories where things ~~sort of ~~align in a way where it's not redundant.

So we've got events and gatherings, goods and provisions. Maybe we could condense this down a little bit. This feels like maybe a few too many categories, but it's not bad for the business directory. I think it might be okay. And then the brand name, the Bangor Wire versus the [00:13:00] Bangor Bulletin, and it's gonna gimme the pros and cons.

And then ultimately it recommends the locale Bulletin. Bulletin is ~~used ~~universally understood. The Chico Bulletin, the Paradise Bulletin, and if we're using a bulletin board. ~~As the kind of literal source material, it's, ~~it's central to this paradigm of a newsletter adapted from source material that's out there in the world ~~that you can just grab.~~

You can extract that source material with this camera sitting in your pocket, and a couple of prompts. With ~~any vision~~ any AI model that has vision. So I'm ~~kind of ~~tracking with this. I say the Bangor Bulletin sounds good to me. It gives me my recommendations. I'm pretty much just gonna approve these.

Now, I want to talk ~~a little bit ~~about, ~~uh, ~~how we might improve on this structure a little bit. And I'm gonna share a story, ~~uh, ~~last week. I went ahead and sprang for this product by a guy that goes by the handle of boring marketer on Twitter.

He's got quite a content engine and he launched this product, which is a folder of skills for content writers. It's $200. I bought it, [00:14:00] but that was with the company that I am with. If I had been paying out of pocket, probably would not have bought it. And to be honest, in looking at the final product, I would say that a lot of his skills.

Are not necessarily the fullness of what you can get out of skills. ~~They're not, uh, useless. ~~They do contain some knowledge apart from what's already in the training data, but for the most part, like when I look at this template here, this newsletter template structure is pretty dang good. Even, you know, it doesn't have any knowledge of how to write a newsletter, but just by virtue of being a large language model that has accumulated tons and tons of.

Source material from newsletters. ~~It has a pretty good idea. ~~If I tell it Morning Brew style, it understands that. But this skill, I'm not gonna show all of it because that would be kind of spilling the beans on the Boring Marketer's product. I just wanna show you kind of the architecture of it. Here. Here at the top you have front matter, which is a subset of markdown.

~~Uh, ~~there's this language called yaml, front matter language. [00:15:00] YAML stands for. YAML ain't markup language and I don't know what markup is. I'm more of a mark down kind of guy. But ~~uh, ~~here we have name followed by a colon newsletter. Description followed by create best in class newsletters that people actually want to read.

Use when someone needs to write a newsletter edition, ~~develop blah, blah, blah, blah, blah. ~~Covers multiple formats. And then down here it has a selection of the different formats you might choose. So this is helpful actually. As a one-time exercise. I'm gonna run this skill. I'm gonna say, read the newsletter skill.

And tell me if you see any ideas for improvement based on what's in that skill. And let's see what it comes up with. If it comes up with any unique ideas based on a more specific set of knowledge around what different kinds of newsletters are. I already know before putting in this prompt that I'm leaning towards something like the news briefing, morning brew style.

And earlier I gave it the suggestion of Axios, the local newsletter company that has ~~just ~~been. Crushing it in local [00:16:00] markets.

So chances are it's not actually gonna need that much handholding here.

Okay, so now it's going to read from the skill, and I'm gonna toggle us into this mode. We've got three modes. Planning ask before edits, and then edit automatically. I like to go in edit automatically. Also sometimes called YOLO mode. And here's what it's finding relevant patterns, why it matters, framing.

This is gold for local news. Instead of just roast beef dinner, you get. Roast Beef dinner. Why? It matters. Haul maintenance isn't cheap. This is how the community keeps the lights on. To be honest, I don't really love that. The number of the day, stat of the week for Bangor, ~~it could be~~ reward for missing Pit Bull, Sasha White Paws, bent tail, call it, blah, blah, blah.

Four, two active listings. ~~Eh, meh, ~~not feeling too crazy about it. ~~The one thing I'm thinking about section, Nope, this doesn't really seem to fit this to be honest. ~~So far nothing from the ~~boring ~~Marketer's skill. Is appearing to be all that revolutionary. ~~Um, so instead ~~I'm gonna create my own skill, ~~which is ~~a finalized newsletter ~~that is actually ~~based on my own preferences.

~~Here ~~it does have a little bit here, subject line formula. The skill suggests specific plus [00:17:00] curiosity or direct value. Now, this is something that we're gonna come back to in a later episode. Subject lines is its own whole art form. And in my other vault I have a whole skill dedicated ~~just ~~to headline and subject line writing.

~~Uh, ~~so for now this will be good enough. ~~But overall, okay~~ quick hits the lead, the number featured partner lost and found the board. One thing, editorial, I'm not too keen on some of these changes, but it's not bad. I'm gonna say I'm not too keen on forcing some of these things in. I think that your first template was better, to be honest.

And now I'm gonna start to fill in a little bit of what needs to be customized here. ~~So ~~for the first edition, assuming I'm going to put this out on ~~something like ~~New Year's Day, January 1st, ~~so ~~anything that references events before that date will be nullified. Let's ~~start to ~~draft out the outline for the specific newsletter and tell me what you need from me in order to make it a complete newsletter.

Now I already have in mind what I wanna do for the feature here, and it is something [00:18:00] about the bore that I mentioned earlier.

So I'm gonna give it that little bit of context. ~~I.~~

Specifically, I think you need a feature for this week, and what I'm leaning towards is a sort of introductory essay about what this newsletter is for, with a example of the bore and all the reasons that it makes sense to have ~~kind of ~~more connections, more trust, more networking, by this, community.

All right, so here it goes. The Bangor Bulletin issue number one, this week's briefing, first edition, the lead, why Bangor needs a bulletin, intro essay. And then we've got our quick hits Roast beef dinner Friday, January 3rd. Post office closed January 1st. Back to normal hours January 2nd. Hall Association meeting.

~~Now featured partner. ~~Okay. What are we gonna do there? Not sure yet. Then we've got our lost and found ~~the board ~~goods and provisions, property and land.

Overall, it's looking pretty good, but now we're just seeing this in the chat mode. I wanna start to see a draft as marked down. [00:19:00] So I'm gonna say, let's see a draft as marked down. And for the intro essay, I'm going to provide you with some source material. For the featured partner, we are going to do the model of a boar share.

And I am actually gonna take from the transcript I've been recording this whole time. I'm gonna take from the transcript what I've said here all about this, and I'm just gonna copy this section of the transcript from this episode. ~~I.~~

~~I ~~am just gonna say, here is the context, and then paste in inside of brackets.

~~Give this to me.~~

So I am just gonna paste a bunch of context from some earlier chats that I had about this borrow of bore.

And then I'll close it with a clear call to action. Go ahead and draft this version one in the pirate wires style. ~~Oh, I almost forgot~~~~. ~~I have in another workspace a document with a style document.

This pirate wires style writing guide is taken from a lot of examples, and it just has some of the things that [00:20:00] I like about them. So I'm gonna go ahead and add a new file. ~~And I'll call this Pirate Wires md and I'm just gonna pop that in there. And then ~~I'm gonna tag this document. So I type at Pirate Wires MD to give it that reference and it'll read the file before it drafts and let's see what happens. We've got issue number one and let's format it in pretty marked down ~~and give it a Read the lead while you're reading this. ~~Here's the thing about living out here. Information travels at the speed of a truck. You want to know if anyone's got firewood? Drive to the feed store. Check the board.

Squint at a dozen handwritten index car. It's half of them six months old. Wanna know? Hey, pay prices. Same deal. Lost dog. Hope you drove by the post office today. This is insane. We've got phones in our pocket that can summit a car in San Francisco, but in Bangor you still have to physically show up somewhere to find out if Greg's got oak.

The Bangor bulletin is the fix. Once a week you get the board digitized, organized, and sent to your phone. Events, services, goods, lost bets. Everything that matters. Nothing that doesn't. Five minutes and you're caught up. But here's where it gets interesting. ~~Alright, here we go. ~~Right now there's a direct born in Han Solo making the rounds of Butte County.[00:21:00] 

Han belongs to Matt Aiken. ~~Chain of spelling here, ~~contractor, pig farmer. Future sponsor of this newsletter. We're working on it. Matt doesn't need ~~Han's Han. Yeah, it is Han Han year round. ~~Bora is only working a few days outta the year. ~~Alright, here we go. ~~Quick hits roast beef dinner post office. There we go.

Featured borrow a boar. And now, looks good. Now let's just write up a skill.

~~Okay. ~~Defining the newsletter style and let's see if it can do this without even having access to its skill creator skill.

~~All right. ~~Well that wraps it up for our first episode. You can see ~~that ~~the potential for skills to revolutionize your workflows ~~is there. ~~But you do need to put in a little bit of work to customize them to your own workflows. ~~So ~~we are going to continue this process. We've already got our first skill in the bag, the Bangor Bulletin skill, write Hyper Hyperlocal community newsletters in the Bangor Bulletin style.

~~And, uh, ~~it's gonna define what that style is, what the job is, what the principles are. ~~And what these structure is. So ~~these are custom instructions. These are now my own. I've got them saved, and [00:22:00] this functions as perpetual context. It's kind of like a modular prompt that now lives right here in my repo, and it's only gonna be brought into the conversation when I ask for it.

~~So ~~I can brainstorm all kinds of other things and those future directions that it thought were too ambitious. ~~And ~~we'll get to all those in future episodes. ~~So ~~follow along for the journey. Will I create the next big thing? The next Axios for rural economies? Rural towns? We'll find out. Stay tuned. ~~I.~~
