import { useEffect } from "react";
import styled from "styled-components";

const StoryStyle = styled.div `
  max-width: ${(props) => props.theme.spacings.maxWidth};
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem ${(props) => props.theme.paddings.NavLaptop};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  h1 {
    margin: 2rem 0;
  }
  h3 {
    color: ${(props) => props.theme.colors.greenDark};
    align-self: start;
  }
  p {
    align-self: start;
    line-height: 1.5rem;
  }
  img {
    max-height: 20rem;
    max-width: 20rem;
    align-self: center;
    margin-bottom: 2rem;
  }
`
export const Story = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <StoryStyle>
      <h1>The Story Behind the Website</h1>
      <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="story" />
      <p>
        My road to making this idea came from all the drawbacks I had learning
        code. After 3 years, I think I finally have enough clarity to help
        others working developers.
      </p>
      <p>
        My first encounter with code was a brief introduction to programming
        (java) and html. At the time, it didn't interest me, mainly because the
        way to teach it was basic and boring. Few months later I got into it. So
        I started on html and css with the desire to make it a beautiful
        website. Little that i knew, it would take me years ( mainly because, is
        more a ux skill than a frontend one). So i keep up, it has now been 3
        years ( 2 on weekend, one fulltime) but some health issue plus the
        curiosity to know it all caught me some time too. In fact, you can
        become a developper way more quickly. Anyway all that time taught me a
        thing or two..
      </p>
      <h3>1- Ressources everywhere But selection is the key</h3>
      <p>
        Internet is a sea of ressources, or even a labyrinth where you can be
        easily lost. I followed a lot of them, freecodecamp, treehouse, etc and
        of course youtube. So what make a good tutorial and a bad one
      </p>
      <p>the good, the bad and the ugly</p>
      <p>
        Long story short, there are mainly good and bad ressources, but the most
        important is what you make of them. A bad ressource is mainly when it
        doesn’t try to explain the inner, larger concept but what makes them
        ugly is when you follow them blindly, not knowing why you change
        something the way you change it. From experience you can get better
        doing this, but it takes way more time and I think it can apply to
        everything but in the case of programming, there is some core concept
        that has to be tackled. My first programming project is javascript, so i
        think it’s even more relevant with it, but data structures are the bread
        and butter of you code, once you really get why list/array exist and
        object/hash, following tutorial, doing code challenge and algorithm
        become way easier. So good ressources are the one with concept and
        material, bad one only focus on implementation, and your use of these
        can make them look ugly
      </p>
      <p>
        That is why, I only recommended 4 ish ressources here. Two of them are
        semester ( I think, one is for sure) from harvard. One helsinki course
        on react and redux. They introduce a lot of concepts and are
        challenging.
      </p>
      <h3>2- Motivation & fun</h3>
      <p>
        Few months ago I got into a bootcamp based in a community with no
        teacher. But even before that, i tried pair programming and looked at
        every possibility to connect with people ( i will link out some links on
        this subject). But i wasn’t really happy with the offer, and i thought
        there could be better solutions. I saw some facebook group where people
        organized to work together, i remember saw a post on cs50 group with
        like 80 answer to work together, that really confort me in the sense
        that something could be done, plus the fact that to organize as a 80
        people group is difficult, you can have different timezone etc. That why
        i wanted to created learnroom, which was on the rally with webcapsule
        for a time. For me the benefit of learning with people is very clear,
        you get more motivation and it’s more fun, and i would have loved a good
        way of group programming would have exist when i just learned
        programming, and that pretty up the story behind this website In the
        next paragraph I will quickly write about my first programming interview
        because I think it can be interesting.
      </p>
      <h3>3-My first job interviews</h3>
      <p>
        My first dev interview was in prague. I'm french but I was abroad at
        this time. It was a job for data visualization mainly on d3. I didn't
        have a good enough knowledge of data structure, especially list/array (
        of course I knew it but not enough to make it crystal clear). Another
        interview for working with typescript, got an interview a lot on git and
        backend which i only scrapped the surface at this time. Finally a few
        months ago, again a job mainly typescript and frontend related, I got a
        quizz and was asked to make it functionally, i couldn’t at the time,
        because it required a good understanding of reduce (js) and promise in
        javascript. a week later i was capable of doing it.
      </p>

      <p>
        But i guess my point is try getting an interview and get the most of it.
        It will always point thing that you could know and make you closer to
        getting a job
      </p>
    </StoryStyle>
  );
};
