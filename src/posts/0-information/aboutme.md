---
title: About Me
description: Small overview about me and my motivations.
date: '2023-03-07'
published: true
---

<script lang="ts">
    import Link from "/src/components/helper/link.svelte";
    import {getAge} from "$lib/helpers/date.ts";
</script>

# Luca Wolf

### Me

Hej!<br>
My name is Luca or Kargisa if you want to know my username. <br>
I am {getAge()} years old.

### My Motivation

I love video games and play from AAA to indie everything that looks fun and interesting.
Video games are not only a joy to play but also fascinating.
It impresses me how you can build such highly detailed worlds and render them in realtime.
How such simple things like casting a shadow of a mesh to the ground or letting a ball roll down a slope.
All these things we take for granted as players of those games but for me I want to know more.
That is why I started my own [projects](). I realy wanted to create my own worlds
with its own rules like all the games I have played over the years.
What I want to do here is to radiate my pation for game development to everyone who is interested
and help those who are in need for some inspiration or guidance.

### More About Me

If you are interested in the things I make check out my [projects]() and
[GitHub](https://github.com/Kargisa "github.com/Kargisa" target="\_blank").
When I find something interesting, cool or just something others should know about, I will make blog [posts]() about it.
Last but not lest if you want to know more about me, you can take a look at my [information](?post=information) and contact me if you want.

<style>
    p{
        @apply text-center
    }

    a{
        @apply text-blue-500;
        @apply no-underline
    }

</style>
