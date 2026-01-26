# Skill Stack Episode 002

[00:00:00] **Charlie Deist:** All right. Welcome back to the Skills Stack Podcast. I'm Charlie Deed, and today I'm joined by Louis Callow over in the uk. Louis, great to be with you.

[00:00:12] **Lewis Kallow:** Great to be with you, Charlie. 

[00:00:13] **Charlie Deist:** This is a new, sort of a new experiment. This is actually just the second episode, and you're my first guest. Uh, and this episode is, I think 10 months or so in the making From the, the first time that I reached out to you, we've, we've had this intermittent exchange on X that, uh, has been a pleasure to, to sort of, uh, learn a little bit about the way that you think, uh, the way that you write.

You're, you're a writer, uh, and also I think you have some background as a maker, a, a, an iOS developer. And, and what particularly caught my eye was your byline with every, every te uh, sort of setting the bar for writing about. AI and AI about writing. They're at this weird intersection of engineering and content.

And, uh, you know, [00:01:00] I I think of this whole project of Skills Stack as, uh, trying to, to turn people onto the fact that tools like, you know, Claude Code, these sort of age agentic engineering tools are actually a much better match with the content creation process than they realize. Uh, so your, your article, that initial article.

Uh, was it made a point that I think, uh, often gets overlooked about prompting and most people are prompting all wrong. You're sort of saying in this article, you're saying that, uh, you know, these complex long prompts where you've got all these instructions in there, none of that stuff really matters compared with if you have one good example.

One or two good examples of the output that you're looking for, the format, the style that's gonna get you 90% of the way there. Um, and I thought that today we could kind of use that same philosophy of examples over instructions to try to get a little bit closer to a definition, not a definition of skills, but an example of skills.

We're gonna actually maybe [00:02:00] workshop the creation of one of these, uh, elusive Skill MD files. But, uh, anyway, that's, that's, that's a long way to kind of introduce, uh, the, the skill stack concept. Um, but Louis, can, can you, maybe you can tell, tell me what, what you remember from that article that you published on every, over a couple of years ago now, or I, I don't know exactly when that first one was published, but do you think it still holds true?

[00:02:26] **Lewis Kallow:** Yeah, and I think this example based prompting is something that I think both of us have championed for a long time. And you know, I've been playing around with AI since the days before chat, GPT, and it was one of the things I noticed very early on is that one of the best ways to get the output you are looking for from AI is to just give it an example of, uh, what a killer output looks like.

And that is just. That has always been, for me, the best way to get results from, um, from ai. And so this is also an insight that every, um, that, [00:03:00] uh, Dan at every had. And so he created kind of a whole product around it. So they have a product called Spiral. And, uh, one of the core features is that you can provide, um, it, it's almost like a prompt template or the, or the earlier versions of the product, uh, functioned like a prompt template where you effectively added, call it, uh, 10 examples of contrarian, punchy tweets.

And then every time you yourself needed to write a tweet, you could just go to this tweet generator and already have all of your amazing examples kind of locked in. And so this was a great way of creating content. Um, and so this article was inspired by the work that I did for them because I, uh, created the first library of prompts, uh, for that product.

And so I went and hunted down, you know, great X. Posts and great LinkedIn posts and great, uh, launch announcement posts and so on and so forth. And a few months after that article came out, I think there was a study, an academic study that was released and it looked at over [00:04:00] 500 prompting techniques. And it found that the single most effective prompting technique is just showing the AI examples.

And so, you know, in terms of whether that still holds true today, I believe so I'm still constantly, uh, sharing examples of great writing, uh, with AI that I want it to emulate. And by the sounds of it, this is something that you are still doing and skills is possibly the next evolution, uh, uh, of this kind of example, based prompting technique.

[00:04:26] **Charlie Deist:** You know, it's, it's funny 'cause you've done, I know a lot of high level ghostwriting for some industry leaders, including some of the people at every, and it sounds like with Spiral, uh, you know, that was ghostwriting at a meta level where you're actually, you know, curating these things from different places.

Uh, and the thing about being a ghostwriter is you never get the credit. Right? Like, I, I didn't know that you were responsible for that feature of every, and, and you mentioned, uh, that was the sort of the earlier version, um, late recently. I, I, I checked in with Spiral and they had changed the interface. It was very beautiful and it looks like they've [00:05:00] integrated the, the sort of anthropic agent, SDK, so you have like a, an age agentic writing assistant right in there, which is awesome.

But they lost, I think the original flavor, what people liked about Spiral, which was the ability to generate these templates with the example as. Basis. The, the prompt was almost secondary. The example was the prompt. You showed it. This is a tweet thread. Now give me a tweet thread from this source material.

So the, the ingredients were just, you bring your own source material, whether it's a, a brain dump, a voice note, a podcast transcript, and it will transform that into the kind of implicit format that is, uh, indicated by the example. And yeah, I mean, this was, this was the breakthrough for me. Uh, my aha moment with AI was realizing that podcast transcripts were great source material, but nobody really wants to read a rough transcript.

At a minimum, you need to kind of polish it up. You can use that as the basis you can transform, not generate, not just say, Hey, write a blog post about [00:06:00] X from your training data. You can use your own source material. Uh, and, and yeah. You alluded to the, the skills evolution of, of this method of prompting.

Um, you mentioned in our conversation on, on X that you recently became kind of Claude Code Pilled. Uh, and, and so you moved over from before that I think you had a setup involving Gemini and their GEMS feature. Um, can you describe what that feature was, sort of how you used it, and then if you're starting to try to replicate that same thing inside of Claude or Claude Code rather.

[00:06:35] **Lewis Kallow:** Absolutely. So, so first of all, I'm not, I'm not just, uh, um, just for kind of like housekeeping, I'm not super sure where, uh, the state of the spiral product is today. And I just wanna make it clear that I didn't actually build, uh, the feature. I just went and found the examples and kind of built some of the prompts.

So like a library of, uh, of prompts. I just wanna take credit for anything that I didn't, uh, didn't do. So it was kind of a prompt engineering, uh, role. But, [00:07:00] um, in terms of the evolution of my workflow, uh, as a writer with ai, um. It first started in a chat window, right? So in standard chat, GPT, and that was great.

It could help you write, but there was all kinds of problems. Um, so for example, every time, like let's say I'm writing an article, I need my, my AI to have access to all kinds of, um, sources. So oftentimes I'll write with scientific studies. Um, and so it needs all of those scientific studies in this context window.

Um, I want it to have those reference examples that we're talking about. So I need those to be a part of the, uh, chat window. Um, we actually need the draft that we're working on to be in the chat window. And so there are all kinds of limitations using the chat window for this because you have to dump all of this, um, context in it.

It's incredibly distracting for the chat box that's trying to take it all in, uh, at the same time. [00:08:00] Um. There's no real clear way of keeping an up-to-date version of the draft, both in your own head and in the AI's head. 'cause it's lost somewhere within, you know, the chat window. And so one of the ways of solving, solving this problem, uh, is to just move over to the project feature that you find inside of Chat, GPT and Claude.

And the equivalent of this feature is called GEMS inside of Gemini. And so I already, uh, have a Google Workspace account, so I get Gemini for free. And so that's just kind of like my, my tool of choice. I think the models have really caught up lately as well. Um, and so my workflow has transitioned to, you know, let's say I'm writing an article, um, well all of these projects features now integrate with Google Docs. And so let's say, uh, you know, the AI gives me a bunch of edits. I can go over to the Google Doc and I can, uh, update it. And so now the next time that the AI refers to the Google Doc, it has a, it has the up-to-date [00:09:00] version of the draft, right? And so if I start a new chat, let's say our chat window got too long, the AI quality was degrading.

I'm gonna start a new chat. Well, guess what? It's in the same gem. It's in the same workspace, it's in the same project. And so all of my science studies are there ready for referencing, um, the latest version of the draft. Is there ready for referencing? And so it's just a way, um, way easier, uh, technique for kind of managing the context that you're putting into the ai.

Another thing is that you would often have to, um. Kind of, so, so there's this thing with, uh, ai, uh, models where they pay attention best to the thing at the start of the chat, which is often the system prompt and the end. And so that's usually the, the thing you'd last said. And so let's say for example, you know, halfway through the chat I say, Hey, pay attention to, uh, you know, this excerpt from Amal Gladwell book that I really want to emulate the style of, well, it's probably forgotten about that at some point.

And so I'd have to go back, you know, find [00:10:00] that part of the chapter, copy and paste it to the top of the chat, you know, send it in. Again, super tedious. Whereas when you have all of these files in, uh, a project, you kind of just say, Hey, remind yourself of that, you know, Malcolm Gladwell, uh, extract that we talked about, and it can go into the file, you know, grab it outta the Google Doc, remind itself.

And, and so again, there's just all these kind of like streamlines that, um, that are applied to the writing process. When you use, uh, a project in this way. Does, does that kinda make sense?

[00:10:29] **Charlie Deist:** make sense? Totally. And, and I never actually got under the hood of gems, but I used both chat GBT projects and more so Claude Projects. And they, like you're saying, they all have basically the same architecture of a knowledge base, so that you can at least start off a conversation with some preliminary context.

You don't have to copy and paste all that, but what you're saying is that in Gemini, because it's linked to your vault, essentially in Google Drive, it's linked to your own files and it has kind of, maybe it doesn't have read write access, but [00:11:00] any changes that you make manually, if you have kind of two windows open, you've got the gem in one window and you've got the drive files that you're editing in the other, then the, the context automatically updates.

Maybe not within that individual chat, but at least the next time you boot it up.

[00:11:16] **Lewis Kallow:** Well within the chat because the next, because then I can go back to to the Gem and I can say, Hey, I just updated the Google Doc with the draft. Take a read of the latest version, and now let's add the next paragraph. Now the limitation, which I think we're gonna end up, you know, steering ourselves toward when we talk about code, code is that the, uh, the gem could not write to the Google Doc.

So it could give me a suggestion. I would then have to copy and paste that over to the doc myself, and then come back to the gem and be like, okay, you know, that edit is now in, let's move on to the next kind of, uh, task.

[00:11:50] **Charlie Deist:** For sure. And I think sometimes here, you know, a picture can be worth, uh, a thousand words. So I'm just gonna quickly share what it looks like in both Claude and Gemini. This [00:12:00] is Claude Projects. Um, I use this a fair amount. Let's go into this open education. This is something from my work that has a whole bunch of documents here.

You can add instructions that would get loaded up at the top of the conversation each time. Uh, one, one little workaround that I realized, uh, you can generate artifacts in Claude. So let's say I'm working on a draft here of a blog post. I could save this and add it to the project, but there's no ability to edit.

This isn't a canvas like you have, uh, in Gemini or Google Docs. So Gemini with the gems, let's say I want to have a, this is, I just sort of spun this up, company knowledge and I don't know, how do I edit? How do you edit a gem? I guess maybe I'll

[00:12:42] **Lewis Kallow:** Yeah, it's over. Yeah,

[00:12:44] **Charlie Deist:** There we go. So. I just gave it as knowledge, kind of a random file from my Google Drive.

There was this one called Context Docs, and you can imagine somebody in the company using this. It's a very handy tool. It's just, and you teased it there, now we [00:13:00] do have something even more powerful potentially. Uh, so, so now, now continue with sort of your evolution. When did you first encounter Claude Code and what have you been playing around with there?

[00:13:12] **Lewis Kallow:** So it was like a week ago. And, uh, so I'm quite late to the party and, um, it feels as though over the holidays, uh, you know, there was like called Code Mania. And I'm seeing this week everybody talking about, um, this kind of phenomenon where they're, they're cheating on their work with Claude Code. And so they're supposed to be like, maybe they're a writer or they're a CEO and they're supposed to be, you know, doing their day-to-day tasks and instead they're just spending all day in Claude code 'cause they're so addicted to the new way of, uh, of working.

And I'm absolutely finding that effect playing out, uh, myself. Um, and so the way I got called Code Pill was because, um. I, I, uh, develop like this iPhone app on the side, and it's been really [00:14:00] frustrating to develop it because, um, uh, iOS development takes place inside of this app called Xcode. And that means it's not easy to use Cursor with it, it's possible, but it's just, it's, it's been more friction, I think for iOS development compared to, uh, perhaps web development.

And so originally, um, I used CORD code to plug into all of my, um, iOS, uh, project. Um, and then I just started from there to realize that, oh, there all these implications of how this thing works, um, on your computer that also apply, um, to knowledge work. Um, and I'm, I'm not sure what like the best way to explain that is, but I think you've been using called Code longer than I have.

Is that correct?

[00:14:49] **Charlie Deist:** I've been using it for a little while. I, I, um, you know, and anyone that's using it at this point is still early, but, uh, yeah, I don't remember. It was [00:15:00] four or five months ago I think that I first started playing around inside of using it, inside of Cursor actually. And, and this is where maybe, uh, if you don't mind, I'll share my screen again and just walk through the rig that I've found to be most amenable.

Um, right now, I actually, uh, this is where like, you know, when there's competing tools, you gotta just sort of pick one and lock into it. But, um, I've been playing around there. There's slight advantages to different. Ides. These, these, yeah. Like cursor, these interactive developer tools. That's, I think that's what the acronym stands for.

I'm not a developer, so I pre, I pretend like I speak the lingo, uh, even though I don't really, um, learning it as I go, which has been its own fun. And I like to think that, you know, cheating on my work with Claude Code is ultimately making me a more valuable employer for my company. Um, this is, I'm gonna shrink this window on my screen so it shows up bigger on everyone else's.

Uh, this is Cursor and you've got a file viewer [00:16:00] over here. So you open cursor, uh, you open up, like if people are familiar with obsidian or a note taking app where you open up a folder on your computer. It might have code in it, it might have markdown files. Probably it'll have a little bit of both if you, uh, are, are using it to its fullest extent.

Um, and we'll get into that when we talk about skills because. In my view, the most powerful skills are the ones that do mix markdown with some choice scripts, uh, to be able to get a little more multimodal or, you know, integrating different tools. But, um, so you'll see over here the main folder, like in the root here, is called, is a dot clawed folder.

And this tells Claude basically, you know, kind of looking here for certain kinds of things. The skills, um, in the skills folder all have descriptive names. And if we look inside a representative folder, I'll go into one. Uh, I'll go into the, uh, let's find a simple one to start. Um, maybe [00:17:00] the SEO research skill.

Uh, this is just a markdown file and I can pull up, uh, inside of cursor, a little markdown preview. There's a handy extension that allows you to view this and sort of read and write. Do, uh, actually wait a second. Is that the right, this is what happens when here it is. This is the one I'm looking for so I can edit it in, in, you know, a prettier version of markdown rather than like the code version.

Um, and then over here we have, this is actually cursors native agent where you can pick which model you use, but the best bang for your buck comes if you actually get a Claude Code Pro or Mac subscription. And then there's another extension that allows you to run it, uh, not inside the clunky terminal where again, you know, I could pull up Claude in the terminal right here just by typing Claude.

And now we've got a little chat interface, but, uh, if you want it to [00:18:00] be a little prettier, I'm curious, are you using a an IDE or are you use going right into plugging right into X code or the terminal? What's, what's your mo.

[00:18:09] **Lewis Kallow:** So I'm using the desktop app, um, which, you know, a lot of people use the command line interface, which is effectively a com, uh, you know, a compute terminal. Um, but I don't like that interface. Um, I think it's much easier to, to read the text its producing and follow along with what it's doing, uh, in the desktop app.

But I think the big insight here is that cloud

[00:18:33] **Charlie Deist:** Oh, interesting. But effectively so, so real. Go ahead. So you're using cloud code in the desktop app hooked up to a, a local folder on your computer or through the Okay. That,

[00:18:46] **Lewis Kallow:** And, and, and so this is what I've kind of realized is that, um, there is this crazy paradigm shift that happens when you effectively hook up an agent, um, which is basically to say, you know, cla uh, Opus 4.5, which is the, you [00:19:00] know, powerful agent model. When you just hook that up to a folder on your desktop, um, incredible things suddenly become possible.

[00:19:07] **Charlie Deist:** Possible. Yeah. I think the, the, the Claude code pill moment for a lot of people has come when they just turn it toward their downloads folder or some folder. That's been a helpless mess. Uh, I went back into an old external hard drive and, and sort of sorted through, you know, years worth of files, Google Takeouts, where the files were all spread out across dozens of different folders where they needed to be merged.

And it just works. Uh, it just, it just works without a whole lot of oversight. It'll work with as little or as much oversight as you're comfortable giving it. Um, so, you know, there's these different, different permissions and those of us that like to live on the edge will operate in a bypass permissions mode, or it's sometimes referred to as dangerously skip permissions.

Uh, it's, uh, you know, as the name implies that there are some risks involved in that. You might accidentally, uh, defrag your hard drive or [00:20:00] whatever that means. Uh, no, but, uh. But yeah, I, I, I think that I wanna get back to sort of the, um, the skill architecture and, and talk through some examples and maybe even get our hands dirty, creating a skill from scratch.

Um, so, because it sounds like you're, you're also at this interesting space where you're, um, you're using it for, for coding as a, an iOS developer, but you're seeing the applications for other kinds of knowledge work. And I would argue, uh, as someone who's always had sort of developer envy, I, I wish that I could code, but I could never get over the, the hump of, uh, just, you know, the, that initial phase where you can't really do anything and it's just not fun yet.

Uh, but now with Claude Code, you know, you get a taste of it and suddenly you're able to learn what you need to know to kind of fill in the gaps and can paste an error message from here to there, uh, and just kind of plow through those obstacles that way. Uh, but I think that writers in particular, because of the way that programming is evolving into something [00:21:00] where you're primarily interfacing.

With an infinitely knowledgeable, and patient shouldn't say infinitely, but you know, an ex, an extremely knowledgeable technical co-founder who can translate your English into any programming language because it's trained on all of these GitHub repositories and, you know, uh, stack overflow forum art of, or, you know, again, I'm, I'm getting a little bit outside of my depth when I talk about it, but, uh, but, but Claude loves that stuff.

If you give it just enough of a, a hook to, to sort of hang on, then it can, it can interpret what you're saying and get you the rest of the way there. Um, have you,

[00:21:40] **Lewis Kallow:** I, I feel like to understand Claude skills, you almost do need to understand at a basic level what Claude Code kind of is. Um. And, and what the shift is. And so I think one way of doing that is to compare the before and the after of, of the workflow. And so just to give you an example from iOS development, it used to be that, [00:22:00] um, you know, the AI would, uh.

Give you the code and then you would copy and paste that into the file. You'd figure out where to do that. Then you would, you know, click run to see whether the code actually works. And then oftentimes there'd be errors. And so you'd copy and paste those errors. You'd go back over to the AI chat window and you'd be like, Hey, uh, you know, there are these errors.

Like why is that happening? The AI would go, ah, here's the code you need to change. So over you go back to X code, copy and paste in the new code. Try again. Well, all of that now, uh, is that happens in one prompt. 'cause what you do is you go to code and you say, Hey, you know, build this feature and it will edit all of your files for you.

'cause that's effectively all, uh, you know, coding is, it is just files on your desktop, which are then loaded into this code editor. So we'll edit those, uh, files for you. It can then run the build, right? So it will check whether the code works or not. It gets the errors back to it.

[00:22:54] **Charlie Deist:** to it,

[00:22:55] **Lewis Kallow:** Then it will go off and fix the files again.

'cause it knows what the errors is, uh, or what the errors are. Excuse [00:23:00] me. Then once we're done, it can even do stuff like connect to your, uh, you know, cloud, um, and, uh, publish the functions that it has just written to the cloud. And so all of a sudden all of it's clicking and typing and copy and pasting and logging into stuff that you used to have to do.

Cloud can now just do it all. And so you just ask what you want and it will just, it will just execute. And then where that ties back into my writing workflow for example, is, you know, I used to use this Google Doc library and I would have to connect, you know, Google Doc to Google Docs to projects and gems.

Well, now if I have all of those files on my, uh, desktop somewhere, and then I just connect Claude Code to that desktop, it can suddenly take the same level of kind of agentic actions, right? To say, Hey, you know, go do this research and edit the draft and it will connect to Google Chrome. You know, Google the site that it needs.

Find the information, come back to the draft. Um, maybe I've provided instructions to say, you know, here's how you should link to [00:24:00] sources in the articles, and it will edit the file for me because again, it has access to those kind of files on my folder. And so, whereas like before, a gem could not edit the file for me, hard code can 'cause it has ac it has like root access to all of the files.

I don't know how that explanation kind of fed, but.

[00:24:17] **Charlie Deist:** to totally. And it almost has a little bit of the feel of like the, uh, the, the, what do they call it? The, um, the sort of lovecraftian monster metaphor for ai. Like the, um, the, there's some great name for it that I'm blanking on, but it's like, it, it's, it's sort of clawing its way out of the box in a way.

Uh, but, but in a way right now we're sort of feel like we're at the point where it, you know, for one, it doesn't have a body. It doesn't have limbs yet, so it's limited in what it can do there. It's also limited by what permissions you give it, but pretty much otherwise, anything that you could do on, on your computer, it can do.

Now that doesn't mean, that doesn't mean that it can do your job from beginning to end. Um, I think it [00:25:00] was, uh, Balaji, Sena Vasan who was talking about how AI is, is. You know, very good at, at certain tasks, uh, you know, as this very sort of spiky intelligence where it might exceed human intelligence by a lot on certain dimensions, just its ability to, you know, work through code and, and produce sort of volume that would be impossible for a human.

But then there's still these areas where we possess, uh, in our, in our minds and in our ability to sort of abstract at different levels of a problem, to see the big picture and to know when a certain rule applies in what context. And I think that's, I mean, that's really what a lot of writing is. It's sort of being able to abstract, you know, zoom in, zoom out, um, make connections that, you know, AI can do that at, at some level and it can make suggestions.

But last night I was reading a, um. Are you familiar with the, the writer Wendell Berry at all? He was a, a southern agrarian in the United States. Uh, but I was [00:26:00] reading this, this essay of his where he is describing a, a visit to Ireland, and it had been a little while since I've just read like good solid prose.

I feel like lately I've been sucking up everything from Twitter about Claude Code and you know, a lot of that stuff you can even tell that it is written by AI with someone guiding it and giving it their context so that it, it contains useful information, but just the, like, the joy of, of a certain kind of prose that connects the dot, you know, that it, it's ineffable and I do think that we're a, a long way off from that, but the combination of the human and the, the AI agent that can loop and use tools can speed up the process and, and maybe in some ways be more powerful than either one alone. But

[00:26:47] **Lewis Kallow:** Sorry, go ahead.

[00:26:48] **Charlie Deist:** well, so, so, you know, speaking of ghost writing too, um, there are all these kind of tricks of the trade. Uh, I, I'd love to pick your brain for, you know, many hours about [00:27:00] how you've approached different kinds of problems writing for different clients. But, um, there is one tactic or, or, uh, technique in particular that you referenced early on in our, uh, in, in our thread on, on x or in our chat on X, which is this idea of narrative snippets.

And I think I have a, a halfway formed idea of what these are. Um, and, and when I read your writing, you had another essay on every published just last week about kind of the, so how the social dandelions, the, the, the nodes for disseminating things in, uh, within networks are gonna be more important in this era when, when you can code anything and when, when any, you know, we're not long from where, just about anyone with the idea who can describe it in enough detail.

Could work with Claude Code to execute an MVP, um, you know, how do you get users for that? That I think was your point. You need, you need these sort of social spreaders, um, and you opened it with this great story, this anecdote about like corn farmers in [00:28:00] Iowa. And then you link that to the point, um, and, and it just makes it so much stickier.

It, it, it brings you in. Um, but what differentiate, you know, what our narrative was that a narrative snippet that I was encountering there? Or, uh, you know, what, what was your process for sort of ideating and then drafting that, that connection did, I'm, I'm curious.

[00:28:20] **Lewis Kallow:** Yeah. So, um, there is kind of, uh, there are some universal blueprints to, to storytelling. Um, and they, you know, come in a few different flavors. And, you know, storytelling I think is a really important, uh, is, is a really important part of my writing. Um, and I think it just helps people. Wrap their mind around the point.

If you start explaining some abstract point to people, their eyes will often just gla glaze over. But if you give somebody a story and then say, and here's the lesson from that story, it's much easier for it to kind of click into their brains. Um, and you find that, um, you know, stories follow a certain pattern.

And so, but, but getting to, [00:29:00] uh, the point where a story is really tight and follows this narrative arc can be really difficult. So I'm writing a piece at the moment about, um, uh, the kind of the, the ascent of Bob Dylan. And so I know that there's this narrative arc that his, uh, life is going to fit into.

'cause ultimately everyone's does. But there are all these details, um, that I have to kind of like track down. And ultimately I'm trying to kind of like move the, move his story into a certain story shape ultimately. And so AI can help with this, um, but it cannot do a very good job if you say, Hey. You know, tell me a story about Bob Dylan or something.

Right? If you, if you inject a generic prompt, you're not gonna get good results. But if I show, um, AI an example of stories I've written before and maybe I show it like six different examples, it will do a much better job at going, oh, okay. I can kind of see that. Bob Dylan's, uh, you know, ascent kind of fits into story Arc [00:30:00] C call it right. And what I found is that the AI will do an even better job at this if you kind of do some deconstruction on the story. And so effectively what I'm doing is I'm going like, Hey, here's a story that I've told in the past. Um, but I'm gonna break down in that same, uh, example, uh, the structure of that story.

So for example, you know, the protagonist wakes up and everything's great, but then disaster strikes, something goes horribly wrong at first. They try dealing with it in a way that doesn't work and backfires, but then all of a sudden they get this new insight that changes, uh, how they approach the problem.

They tackle the problem with this new solution and it works. And so they have this like, you know, new wonderful insight. And so I'm giving the AI like, Hey, here's the story. Hey, here's the structure. And I'm basically feeding in a bunch of different, uh, templates like that. And so then the AI can kind of like guide itself much more effectively towards reproducing.

[00:31:00] Uh, that kind of story, if that makes sense.

[00:31:02] **Charlie Deist:** makes sense. Totally. And, and again, it's the same formula of you you find, kinda like with spiral, you curate the examples that you like, you provide the context and then the instructions are really just sort of, you know, additional maps or guides to the context. And I think that's kind of how I've come to see prompting is you need to provide just enough context to give a map to all the other material that you're giving.

And sometimes you actually get a better answer with an open-ended prompt. There's something, you know, there's enough in that example that if you try to over-engineer it, tell it exactly what you want, it's gonna give you, you know, okay. A warmed over version of, of what you suggested. But then if you leave it a little bit open-ended and ask for maybe multiple ideas, and then you can kind of pick one.

That's I think the kind of workflow, uh, that, that, yeah. That I've been leaning towards. And I'm working on kind of too many projects at once right now, but they all have the same sort of core [00:32:00] that I'm using some sort of skill architecture that is translating inputs into outputs. Um, you sent me a, a document.

Is this, uh, is this safe to, to share in the public domain here? Are you comfortable if we, if we sort of dissect this and look at it as an example?

[00:32:18] **Lewis Kallow:** Yeah, it's very simple. It's kind of just what I

[00:32:20] **Charlie Deist:** pull this up

[00:32:22] **Lewis Kallow:** And I, I, I have a sense that you

[00:32:24] **Charlie Deist:** uh, this is.

[00:32:26] **Lewis Kallow:** into this territory than I

[00:32:27] **Charlie Deist:** Doc, but I'm guessing maybe you had copied it in from somewhere in your Claude code or something like that.

[00:32:35] **Lewis Kallow:** Yes, exactly. So I've been moving my workflow over to Claude Code, and so I had code, uh, you know, return this for me.

[00:32:43] **Charlie Deist:** right? All right. And actually I'm gonna share, I'll share my whole screen for a second at the risk of, uh, showing how messy my get. Uh, we'll just come in here and now we see the, the infinite regress of Riverside here. Here's your document, but I'm gonna come [00:33:00] back into cursor and I'm just gonna copy this into a markdown file.

I'm gonna make a new little folder, and this is, I'm gonna do it in my workspace here because we have some existing skills that I might also dissect. And my plan is at the end of this, I'm stealing this, I'm swiping this from you, and I'm gonna use it for my next article, uh, if all goes according to plan.

So, um, I'll also just give sort of a high level. View of, of this workspace. And there's, there's kind of a lot of clutter, things that we don't have to pay attention to. Um, I have the content database of everything that we've published, and this is actually, this gets scraped from our CMS directly, which is Webflow.

And I've got a, you know, just the API key for Webflow hooked up so that I can run that periodically, kind of bring in new content. So all of my previous blog posts, uh, newsletters and podcasts are accessible along with an an index here. Um, so that if I'm, if I'm trying to just first hone in on the articles that might be relevant to a particular [00:34:00] topic, I don't need to send it looking through everything, I can kind of send it, uh, into the, actually

[00:34:06] **Lewis Kallow:** Okay. Can I just pause you there? Because what you just said is exactly why I think people are gonna start embracing, uh, platforms like Cloud Code more and more. Because what you just said is that, um, you know, think about my old writing workflow, right? I had to manually, like, let's say I wanted, uh, Gemini to have access to all of my previous Action Digest, you know, additions.

Well, I would have to, you know, go and copy and paste them all. Or maybe I could paste the link into Gemini, but it would have to reproduce the text. I'd then have to create a Google document. Then I would have to connect that Google document to, you know, the, the, the, uh, the project. Whereas now you're saying you have got this agent to autonomously, pull down every new edition.

And then whenever you are basically ready to like write a new, uh, draft, you can say, Hey, not even, not even like, look at these previous editions. Right? Tell me what editions [00:35:00] in our library you think we should reference as we write this new one. And the agent can go and read the index, read all of the new editions, which is now autonomously up to date, and it can pull in that context.

And so it's kind of like just, uh, it, it, it's like an, it's like the ultimate form of context, uh, engineering that this enables.

[00:35:18] **Charlie Deist:** Right. And, and even without the organization, if you just dump all your files into a folder, you can get a sense of how that ag agentic file search works. And one of the, one of the things that I had to learn as someone without a coding background was some of these words like, you know, gre and glob, and you'll see Claude code using these a lot like grepping.

You know, it's, it's basically putting out, I, I like the words, especially sort of sound like tentacles. So I think of it like it's putting out these tentacles, but really it's just searching for strings of text with sort of asterisks at, at, uh, strategic points so that it's most likely to find the, you know, in terms of the, the file path, it's looking for certain keywords, certain patterns, and that can get you a [00:36:00] pretty long way just keyword search for the things you're looking for in a disorganized body of notes.

But if you can give it the maps, it enables this, this thing that, uh, also applies to skills called progressive disclosure, where instead of bringing in all the context that is gonna. Take up your entire 200,000 token context window. Uh, it's gonna be able to, with just a few tokens, just reading a few little short things, be able to hone in on the stuff that then it needs to zoom in on, so you can kind of think of like, um, you know, somebody that, that's got a, you know, able to swipe in and just, you know, zoom in on the part of the map that's relevant so that you're not, uh, having to load at full resolution the entire map.

Does that make sense?

[00:36:45] **Lewis Kallow:** a hundred percent.

[00:36:47] **Charlie Deist:** So, so the, the skills, um, all these skills, I've got about two dozen of them in here. Everything from podcast production to, uh, transcript polishing, video caption creation, also [00:37:00] the web flow publish. This is the other direction of getting things actually published to web flow. Um, and this one I'm noticing actually doesn't have exact, the exact right nomenclature 'cause the skill itself is in a file called notes.

Uh, so this was maybe a, a rare miss on Claude's part when it created this skill. It should have named this File Skill md, but, uh, it, it references where it can find my API keys, um, what the names of the, the databases are on the backend so that it can quickly, it's kind of already reasoned through this, how to do this.

I don't have to set it up from scratch each time. Um, but, but the main skills that I rely on are content based. And so taking something like, uh, you know, hook and headline writing, this is the basic skill. And, uh, it's got kind of a, a core philosophy. Wait, let me see if I can get this into, uh, markdown formed or pretty pretty markdown so we can read it.

It's got the, the name is called Hook and Headline Writer. And then the [00:38:00] description, this is the only part that loads, but every skill, name and description loads at the beginning of every chat. So if you've got two dozen skills and each name and description is maybe, uh, 50 words, something like that, then you've got, you know, a total of maybe a thousand characters of, or a thousand words.

Uh, pretty minimal in terms of the, the context window. And, and it will only zoom in on or invoke the skill that's relevant to the task. At the stage in the process. So if I've been working on a whole article, then I get to the end, I say, okay, I'm ready to write my headlines. Then it will pull in this skill.

And there's another layer to the progressive disclosure. Um, at one point, I think you mentioned something about kind of, you know, references and within a, uh, a skill folder, you have the main skill, but you can also put different, like sub references into additional markdown files that again, only get invoked at certain [00:39:00] times when they seem necessary to the task at hand.

Um, and, and there's always room for improving the actual design of a skill. Um, that, that the best way to do it is just to use the skill often and make changes in real time because you can edit, you know, read, write access within the skill. Every time you run a workflow, you can be iterating on the skill and improving it as you make new discoveries.

[00:39:23] **Lewis Kallow:** So, so let me ask you something. When, you know, when I'm going through my, like let's say I'm trying to figure out how to use code, code to, um. Let's say I'm, you know, building out my writing workflow and I realize that it might be able to publish to beehive, you know, for me or something like that. At what point in my workflow should I think to myself, okay, this is when I now need a skill.

I need to create a skill.

[00:39:48] **Charlie Deist:** skill? Yeah, there, there's a great, uh, comic that, uh, classic XKCD comic where it sh it has a table of, you know, um, how many times are you going to do the thing and [00:40:00] how long does the thing take? Uh, the more often you do it, and the longer it takes the, the more likely it is to warrant a skill.

So for regular publishing workflows, I think it's a great. Uh, you know, invest the time, invest and you can kind of do the, the formula of the amount of time that you're going to save, multiplied by the number of times you're gonna do it over the next five years tells you how much time you should invest in actually making the skill.

If it's a one-off task, don't bother with a skill. Just, just reason through it that one time, maybe at the end of that process, if you feel like you've kind of, uh, you know, solved a problem, you can retroactively say, oh, great, you know, I realize we just did this. Let's turn this into a skill. Um, and, and as soon as you say those magic words, any variation on let's make a skill, let's turn it into a skill.

As long as you have the skill creator skill to get just a little meta here, uh, this is Anthropics own guide to sort of best practices on how [00:41:00] to create a skill. And depending on the type, you know, bundled resources that are optional, things like scripts to execute code, references to be loaded in to context, to inform the thinking.

And again, this is that sort of secondary layer of progressive disclosure. Some skills will use code every time. Um, I've got one, an image prompt generator. This one was actually sort of inspired by, um, every, I know that they have an in-house designer, but I've tried to sort of reverse engineer the process that they use for generating these interesting looking thumbnails.

And, uh, so I tried to kind of isolate like what are the criteria that, um, that make a, a good thumbnail, kind of curiosity provoking, visually interesting. This skill has a few different steps where it basically first comes up with some high level concepts, some, some sort of like, uh, combinations, juxtaposition of different sorts of images, and then it puts it through a prompt optimizer designed for Gemini based on [00:42:00] kind of how Gemini reads and, and ingests your prop.

So you can turn the, the knobs and dials a little bit, and then it has a script to actually run this through the nano banana, API and give me, um, outputs in a particular style. So, I don't know if this is gonna load, these were some kind of variations, uh, in, I have a, a, a pre-written style for kind of a watercolor line art thing, um, to maintain consistency.

And this is just a way to, you know, enshrine consistent, uh, visual vocabulary into your prompts to get consistent outputs. But you can do the same thing with writing.

[00:42:37] **Lewis Kallow:** so for example, if there is like a step in your writing workflow where you need an image to be generated, there might be all kinds of, um, knowledge that Claude needs in order to actually generate the image. In terms of connecting to, you know, the Gemini, API, it might need information on where to save those images.

Um, in your computer. It might need a certain prompt that it has to use, it might have, you know, you might need to instruct it to [00:43:00] review your article before it generates the image. And so you might have to provide it the images that you've already generated for consistency. And so basically a skill is where you can put all of that information, uh, in one place so that when it's time to generate an image, Claude goes in and goes, okay, I understand, you know, I have to do these five things.

And then at the end you're gonna have a, you know, a consistent image.

[00:43:21] **Charlie Deist:** Yeah, it's, it's like an, i I like to think of it as kind of an, an energetic pathway and in nature, you know, you have all these things where like the more they get sort of, uh, the more often you, you, uh, route something through that path, the, the stronger that structure gets or the more defined it gets. You know, on this property where I live, we have cows that if we put up a fence in a certain way, they walk along the, the road and they make like a well worn path.

And, uh, and it's a lot easier to, to get through than, you know, having to tramp through brush or uneven ground. And, uh, and I sort of think of skills the same way. The more often you use it, the more defined it gets and the more it learns [00:44:00] from each iteration. Yeah. Things like you mentioned, where to output the files.

I think I made a later addition to this one. I would've to go digging in here to find exactly what it is, but. Maybe down here. It should, it should have something about where to put the files at the end. Um, and, and yeah, as I've developed more styles for the outputs, I have, I think, um, I have like a New Yorker cartoon style, uh, watercolor minimalist ink.

So, you know, you just keep iterating. Um, but what do you say w we try to kind of define this narrative snippet thing as a skill and see if we can, um, demonstrate it rather than just explain it.

[00:44:41] **Lewis Kallow:** Yeah, that'd be awesome. Um, I wonder if maybe you have some ideas on how to approach this, but for example, one thing that I was thinking about earlier that is now again, possible through call code, but wouldn't have been, you know, would've been a nightmare set up beforehand, is I could in theory say, Hey, call code.

Um, every time, [00:45:00] uh, a new podcast episode is published to my favorite podcast, you know. Grab it, uh, grab the RSS feed. Like go look it up, download it to my computer. Uh, you know, I'm not saying we do all this, but what, maybe we could just do a part of it, but like, once you have that file downloaded, um, transcribe it.

So using like YouTube DLP on my, you know, uh,

[00:45:22] **Charlie Deist:** Yep. Yep.

[00:45:24] **Lewis Kallow:** save that transcript into, you know, a certain folder, then use this prompt to like, run through the transcript and extract quotes or a story perhaps that the guest tells that could fit into our, you know, narrative arcs. And then present to me, you know, what you found for me to approve, uh, or, or reject,

[00:45:45] **Charlie Deist:** you're speaking my language. speaking my language. This is actually my, my first, uh, my, my first major like, vibe, coding, experi. Was in first trying to create kind of a user interface for bulk transcribing [00:46:00] podcasts and YouTube channels. So this is, this is my app, uh, it's called Doodle Reader. Uh, it's a slight nod to the old Google reader that Google retired back in 2013, and still to this day, there is not an RSS feed reader that just works like Google Reader did.

Uh, so I can, I can add a feed here. I don't know. What's a podcast that you like?

[00:46:21] **Lewis Kallow:** Oh God. Um, there's

[00:46:24] **Charlie Deist:** AI and I, let's see if we can find, uh, AI and I from here we go and it pulls up the feed from, from Dan. Let's see if, let's, for one, one question is gonna be whether I have my, uh, API keys loaded. And actually, I think every dot they, they, uh, they have their own transcripts that you can just, you know, search for.

But in this case, I've got it hooked up to Gemini. I'm not sure if this is actually gonna work with, if my API keys are hooked up here. Gemini is, by the way, Gemini's speech to text. I have to say I'm a Claude Maximalist, but I'll, I'll be honest, when, when [00:47:00] Gemini models beat Claude, I'll, I'll be fully transparent.

And Gemini is a workhorse for anything related to high output tokens, um, or speech to text. They, they are 50 times cheaper than the previous sort of state of the art for audio transcription. So if you're building anything, uh, that requires, uh, speech to text, Gemini is the way to go. Um, but I realized this whole interface here, this is kind of based on the old way of doing things.

Whereas I've been working on kind of, and I'm, I'm not quite there yet, but I have a set of skills that can basically take in a podcast and, and do this stuff all just through the command line with exactly those tools that you mentioned. Whether it's Y-Y-T-D-L-P for scraping transcripts or Appify is another one.

Um, or the, the, the most accurate way, uh, to get um, a podcast transcript is actually downloading the MP three file from the RSS feed and then feeding it to a model like Gemini [00:48:00] or assembly that does speaker Diarization. Um, but yeah, AB absolutely

[00:48:05] **Lewis Kallow:** the exciting part is that you can now operate that whole workflow in any workflow you can imagine through like the, the Claude Desktop app, uh, using Claude code or using like the online interface. So I don't even know if that, you know, I mean, the app you built looks beautiful, but I don't even know if you, if you need it now, it's kind of like a middleman.

Um

[00:48:23] **Charlie Deist:** true. Sometimes it's nice to have the interface, like if you just want a good reader app for, you know, casual reading. But, uh, let's, let's dive into this. I'm gonna start, so basically what I did here, I just dragged in this file. This was the example that you gave me of a, of a narrative of maybe a couple of narrative snippets.

You've got template one and, um, maybe there are,

[00:48:45] **Lewis Kallow:** actually two kind of separate prompts. So I believe one is designed to pull out great quotes from a transcript, and the other is designed to like help write, uh, a story.

[00:48:56] **Charlie Deist:** Alright. Alright. I love this. We're, I'm actually gonna connect [00:49:00] this to my podcast workflow because that, that will give us some source material here. But first I'm just gonna get it oriented and say, uh, you know, read, read this document and see if you can kind of tell me what the, the, the gist of it is

[00:49:13] **Lewis Kallow:** Mm-hmm.

[00:49:15] **Charlie Deist:** and it's mating. I don't know if I can zoom in on this. I don't think so. Uh, but quickly we're gonna try to get it to operate on some source material. Oh, hold on a second. I think I need to save it. Uh, let's try that again. Oops. Try that again.

[00:49:35] **Lewis Kallow:** Hmm.

[00:49:39] **Charlie Deist:** Little things, little things like that.

[00:49:41] **Lewis Kallow:** But then, yeah, so the other cool thing is, is that like, now that I have this growing folder of documents in this folder that Claude has access to.

[00:49:50] **Charlie Deist:** Ah,

[00:49:51] **Lewis Kallow:** You can do all kinds of cool things like, um, I could ask it what I've done over the past year and it can go look at my GI history. It can go look at all of my additions of the action [00:50:00] digest.

It can read my email and it can kind of, you know, build up this documents folder of, uh, of info.

[00:50:07] **Charlie Deist:** Yep. And, and this is where I do think that some advantages will accrue to the people that adopt it early. And, and anyone that's waiting for anthropic or someone else to create like fancier wrappers around this, they're probably coming, they might make it easier. Uh, but I would, you know, for a long time I was thinking about what would the, the writers version of the IDE look like.

And then I realized it actually looks a lot like the existing ides. You don't really need to change all that much. You could have a few guideposts to make it easier. And I think that one area that's gonna take off are these skill marketplaces where you can do kind of one, one click installation of a template, and then it will sort of unpack or install itself in a way that is drawing on your existing context.

So most skills work better if they're tailored to your preferences, uh, and your, your existing context. Um, and, [00:51:00] and, you know, we'll, we'll show this. I'm just gonna say so here, and I know that this font is probably tiny. Maybe I'll, what I'm gonna do is just share one more time, uh, with the smaller screen. Do you have a few more minutes?

I know we're after the, the

[00:51:15] **Lewis Kallow:** Oh yeah, definitely. Yeah. Yeah. As long as you need. Um, yeah, I think there are gonna be two groups, those that just take this and get stuck in and figure out all the possibilities and build completely custom workflows. And then I do think there's gonna be another camp that wants those people to still build kind of opinionated software and workflows for them that they can just plug into.

[00:51:38] **Charlie Deist:** just plug. Fair enough. Uh, you know, this, this could be something that I edit out or, or share with you later, but for what it's worth, I think that you should be throwing your hat in the ring as the, uh, product manager for Spiral. Uh oh. Whoops. Hold on a second. Let me.

[00:51:57] **Lewis Kallow:** I think I have too many different projects going on to like [00:52:00] commit to, uh, any one thing full time.

[00:52:03] **Charlie Deist:** I hear you. I hear you. It's an exciting time to be a, a sort of free, free spirit freelancer. Um, so okay, are we back in the, can you see me here with the, the open-end vault? And this is a narrative to, okay. Alright, so I'm gonna say, um, I want to apply this as a kind of skill to a podcast that I was working on recently, uh, with the minimalists host Joshua Fields Melbourne.

Um, this is actually very timely because this was a podcast where normally I do my whole podcast workflow and the assets that I create from the transcript are a cold open. So I pull out kind of some of the best little, again, it snippets, actually I might've stolen that word from you. Uh, just l like the best little tidbits from the episode and kind of arrange them in a way that creates a little bit of suspense or, uh, an anticipation of what somebody's gonna get from watching that episode.

And then I do the clips, um, I do the YouTube [00:53:00] timestamp chapters, YouTube description, title, and thumbnail concepts. And then, uh, at the end of all that, I sometimes write a blog post in the voice of the host of the podcast. But this was one that I, I felt like the, the version that I was getting from my usual prompt wasn't quite, uh, wasn't quite hitting.

Now, hold on a second. Let's see what we've got here. I've read both files. Podcast has rich material, but it's structured as a philosophical conversation rather than a single dramatic narrative arc. Like the Schultz story. Let me identify what we can work with. Um, it's okay. It's a transformation from stomach aches every morning in public school.

This was a podcast about someone that had let their kid,

[00:53:41] **Lewis Kallow:** sounds interesting.

[00:53:42] **Charlie Deist:** Actually, yeah. Let's see. Joshua's dropout turn Success tried to drop out Mr. Day. Saved him with a creative arrangement, skipped college, built the minimalist. Uh, mentioned briefly, but not in narrative detail. Dyslexia, reframe discovered at 40 what he thought was just reading was hard.

Um, and maybe [00:54:00] I actually would've benefited from reading this a little bit more carefully, but can you de describe again, like what is the, what is the end goal of a, of, of this prompt?

[00:54:10] **Lewis Kallow:** So I think we're looking, yeah, we're looking, you know, to, to put the source material in and say are there any, you know, is there a, are, are there kind of story arcs here, um, within this content that fit into, you know, the existing template? So I would be curious to know, like, so, so in,

[00:54:31] **Charlie Deist:** in

[00:54:32] **Lewis Kallow:** let's see. Yeah, so it has the template beats there

[00:54:37] **Charlie Deist:** Right,

[00:54:37] **Lewis Kallow:** heavily.

The blow responded differently, the outcome, reflective takeaway, um. So I'd be curious to know if it could just write a story about,

[00:54:47] **Charlie Deist:** about,

[00:54:47] **Lewis Kallow:** you know, like, could it write a, a short story, um, that's accurate and pulse on some of those quotes that were referenced.

[00:54:56] **Charlie Deist:** right.

[00:54:57] **Lewis Kallow:** I'd be curious to see how it handles that.[00:55:00] 

[00:55:00] **Charlie Deist:** yeah. Okay. I'm gonna say voice is general open ed, brand slash editor of the Daily, not Isaac, the host. Um, also, I'm not sure that the daughter's name was Ella, so check that detail before proceeding nor normally. I wrote most of the prompts for this skill around Ella being the host of the podcast.

Um, I'm also gonna say, make sure you read the original source, uh, transcript before, uh, proceeding to this next step. And yeah, you know, if we had. If we would, you usually, I'm guessing if you're working on this as a longer piece, you'd probably kind of do a lot more intermediate steps of outlining and, uh, interrogating it a little bit.

Teasing out some of the, the nuances.

[00:55:48] **Lewis Kallow:** Well, well, at first this is probably what I would do, right? Because I don't want to go read a, you know, an hour and a half long, uh, podcast transcript. So I would just go like, Hey, is there a story? Is there a really compelling story in here? [00:56:00] What is the most compelling story? And then again, it can 'cause it has these story beats.

It can kind of go through and go, yeah, actually we do have a story in here that fits all of the beats that you could work with. Then I would go and kind of like look at it closer. Um. But it sounds like one of the great benefits of, again, using a product like code or like, um, you know, using these skills is that you can have it do a fact check.

You know, you can build that in as a step. And so you can say to, um, you, you could build it into this, uh, this workflow here, right? It's like, go and find me a story that works. And then you could say, and then also go fact check yourself, you know, after you finish doing that. And, uh, pull out all of the, um, snippets from the podcast that support, you know, the claims that you are making, for instance.

And it can then just go and do and run and run that every time without, you know, in, in, uh, your interject.

[00:56:54] **Charlie Deist:** No, it, it's so true. And, and, uh, people are talking a lot in the coding world about these Ralph Loops, [00:57:00] uh, which is that, that's a whole other episode that I need to do on, on the Ralph Loop, but it's, it's a way to set the agent running on a clear track with smaller tasks that it can break down and it doesn't come, it doesn't finish the loop until it really is sure that it's solved those features in a, in the right order.

Uh, and, and there's a concept in the Ralph Loop called back pressure, where you basically have these specialized agents, these personas that are standing as gatekeepers to make sure that that the, that Ralph, the the Simpsons character who's sort of this lovable, you know, highly persistent in the face of all obstacles character, uh, he doesn't, he doesn't get to say he's done unless he actually passes through those gatekeepers.

And I've implemented a primitive version of this, I call it the quality loop. Uh, and you have five personas that are doing different things, one of which is, you know, go fact check yourself. Um, and, and the others are things like, you know, looking for AI tells [00:58:00] in the writing too much of, you know, here's the thing, or, you know, uh, let's delve into this, or whatever.

All, all those obnoxious things that everybody can smell from a

[00:58:10] **Lewis Kallow:** sounds super interesting. I mean, I'd be curious to, to to see more of that.

[00:58:13] **Charlie Deist:** But we've got a draft here. Um, and it sounds like actually the name was right. Confirmed. Her name is Ella. All right. That's just a coincidence that it happens to be the same. Uh, but yeah, here we go. When school becomes clutter, one father's decision to remove the desks. Joshua feels Melbourne. Didn't know he was dyslexic until he was 40 years old.

I was in the public school system that was, I don't know, adequate for most people. He recalls he struggled through school, collected detentions for missing homework, tried to drop out his senior year, standardized tests, never captured what he could do. I just assumed that reading was really difficult. It wasn't until his daughter, ellas started struggling to read that the picture came into focus.

She had some dyslexia tests. She, he did them with her. And I'm like, oh, ooh. I mean, this is like, uh, without [00:59:00] exaggeration. This is like 10 x better than what you would get if you just said, write a blog post based on this transcript.

[00:59:09] **Lewis Kallow:** A hundred percent. Yeah, because there's, there's just, there are certain stories, you know, that we like to have information packaged, uh, as this is pretty interesting. I'm, I'm curious to read on, uh, but you can see that it's kind of like started with a problem, right?

[00:59:23] **Charlie Deist:** yeah. Yeah. Well, and what's funny is I'm realizing that, uh, I had drafted a cold open for this episode that was sort of a montage of different things. But this, this same format is what the good YouTube creators use for their cold opens.

Like if you ever watch a Colin and Samir episode, those guys are masters of taking any content. It could be the most boring interview, and they would find ways to edit it together so that you're like, I have to watch this. I just, I have to stop what I'm doing. I came to YouTube to upload my own video, but now I'm gonna watch an hour long, uh, video from a channel that I don't even care about because, [01:00:00] you know, they just nailed it with that.

Um, and this right here. This is perfect. I'm gonna take this exact content and repurpose this into the cold open. I'm probably gonna rewrite my whole, uh, cold, open component of my podcast skill around this. Um,

[01:00:18] **Lewis Kallow:** yeah. 'cause you, you could read the, you could be the narrator right? In this version, and then you actually get an editor, an AI editor to put in the clips of, uh, the guy saying these quotes.

[01:00:29] **Charlie Deist:** right, right. And, and it's amazing. I mean, we, we could go on and on and, and we'll probably we can start to wrap up 'cause I, uh, I want to be mindful of your time and if we need to, uh, set a, a, another appointment sometime in the future to to circle back and finish this skill and talk about other exciting updates in the world of cloud code, we'll do that.

But I'm just gonna, I'm gonna. Do one thing here to, to round this out, I'm gonna say, yes, this is fantastic. Let's use the skill creator to package this into a skill, and let's [01:01:00] also update the cold open component of my current podcast production skill to incorporate what's essential about these story beats, because this is exactly what I'm looking for in an edit of a cold open.

So give me a new version of the cold open and also edit the instructions that I had given to my podcast editor. So that's my preferred way of working with Claude Code is to just flow with voice. You know, combine, stack multiple prompts into one thing and just trust that it's gonna keep up. And it's, it is amazing.

It's, it's a totally different way of interfacing with knowledge work.

[01:01:36] **Lewis Kallow:** Now again, I think the really key thing that's happening here for people that maybe haven't tried Port Code yet is that you have just, you know, said, Hey, go and update, you know, my system and it's just doing it for you. And so, you know, I feel like, uh. There were all these knowledge management system.

Everyone, everyone has had a week where they go and create some kind of convoluted knowledge management system using notion or, you know, Rome [01:02:00] research or obsidian, whatever it is, and fast forward one month, they've abandoned it because it just takes too much work to like maintain, it's constantly falling, um, out of sync.

Whereas, you know, this is the dream that we were promised, I think from all of those knowledge management tools is you have the ability to just say like, Hey, I've just found this new thing. Go and update. You know, go and update the whole system and it just does it.

[01:02:23] **Charlie Deist:** Absolutely. And, and we've got the skill now we've got the narrative snippets, at least a draft of it. You know, I would review this and, and make sure that it's sort of written the way that I want it. Um, overview to, it looks like actually it's, it's taking some shortcuts here, which is sort of interesting.

I feel like the skill creator that philanthropic created is not the final version of what the skill creator could or should be. Um, I think Spiral actually does have an opportunity to come in here and, and help people, uh, sort of bespoke skill generator, like a wizard in a way that helps people, uh, turn their knowledge into skills, [01:03:00] maybe without this, uh, more complicated terminal interface.

But, but this foundation is fantastic and I'm, I'm super excited to play around with this. So I'll, I'll send you what, what we came up with here and if you want to start to use and iterate on this skill as well. Uh, I'd love to see where, where you would take it. Um, but, uh, oh, one, one other thing. 'cause I, I made the note to edit my existing, um, oh, that's so funny.

So I just got rate limited here. Uh, and this is actually, this is my, this is my secondary burn burner account for, I, I have a. 20 x max plan that I, for the first or second time, I maxed out my five hour rolling window today, and it doesn't reset until noon. So I logged into my other, my other, and that's I'll, I'll, I'll share with you another time.

The projects that I've, uh, discovered can be when you have excess tokens to use. I've got a few things that are always kind of on the back burner that are, um, for now they're in [01:04:00] stealth mode, but, uh, but I'd be happy to share that with you offline. So, la last thing, la last thing I'll note is, so I'm, I'm editing my, my other skill about the podcast production and it's very tempting to always just add on to your skills and add onto your skills.

But you made another point in that, uh, original every article about, uh, the power of subtraction rather than addition applied to prompts, basically that there's more to be gained from, from subtraction than addition. It's minimalism, it's the APHA approach. Uh. And, and I think that this very much applies here.

I almost want to install like a system level rule in my Claude MD file that says, anytime you're adding to a skill, you have to find some way to, to take something else out. Otherwise you just get this kind of patchwork of conflicting directives. Um, and that's the final little tidbit that I'll, I'll leave people with.

But, uh, any, any kind of parting words of wisdom about the, uh, the, the Via negativa or, or anything [01:05:00] else?

[01:05:01] **Lewis Kallow:** If you, if anyone's listening to this, then they haven't tried a platform like Cloud Code. Just go do it. Go figure it out. Find a YouTube tutorial or, um, you know, some kind of project that you can just get stuck into. And once the paradigm shift happens in your brain, you'll suddenly see how you can use it to do everything pretty much in your work life.

And you'll be 10 to a hundred times more productive.

[01:05:27] **Charlie Deist:** Awesome. So it's, uh, it's Callow Lewis on X at Callow Lewis. And, uh, you also write a newsletter. I think you have a, a, a beehive newsletter. What's that about?

[01:05:38] **Lewis Kallow:** Yeah, that's called the Action Digest. And, um, uh, it's hacks and insights for taking action and making ideas happen inspired by, uh, Scott Belsky who, um, I, uh, I write it with.

[01:05:51] **Charlie Deist:** Oh, very cool. I'm gonna have to do a deeper dive on that. And, uh, Lewis, I really look forward to the next time we get to talk. And in the meantime, [01:06:00] let's, uh, keep the conversation going on X

[01:06:02] **Lewis Kallow:** Yeah. Thanks for coming on. I'm so glad this podcast exists. 'cause I, I feel like I belly scratched the surface of, uh, all of the, uh, the skills and the knowledge that you, uh, that you have. And so I'm excited to learn more from this podcast and upgrade my, my content game.

[01:06:16] **Charlie Deist:** Well, you were the one that first pushed me over the edge and encouraging me to do it, so now I'm, I'm committed. I've gotta stick with it. Uh, they say that if you can.

[01:06:23] **Lewis Kallow:** and making ideas happen.

[01:06:25] **Charlie Deist:** If you can get past like 10 episodes, then you have a much higher chance of surviving. So, uh, maybe I'll have you back on as my, my 10th episode just to, to make sure that I keep it going.

[01:06:36] **Lewis Kallow:** Yeah,
webflow 
[01:06:36] **Charlie Deist:** thanks again. And,

[01:06:37] **Lewis Kallow:** more articulate second time around as well.

[01:06:40] **Charlie Deist:** no, no, no. We're, we're, you're golden. But, uh, yeah, thanks everyone for listening to the Skills Stack Podcast. Drop me a line on x, uh, just DM me. Um, I'm thinking about creating maybe a little private community, the Skills Guild, uh, by invitation only, but that, that means you have to invite me.

So, so reach out and, and invite me and I'll, I'll [01:07:00] add you. Uh, so long for now. Take care.
