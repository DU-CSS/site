"use client"

import { CommitteeMember } from '@/components/about/CommitteeMember';
import { Card, Heading, VStack, Text, SimpleGrid, Box, Link } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive'

export default function Page() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <VStack
      p={"20px"}
      justify={"center"}
    >
      <Card w={isTabletOrMobile ? "100%" : "60%"}>
        <VStack p={"25px"}>
          {/* <Text fontSize={"6xl"} fontWeight={"black"}>DUCSS</Text> */}

          <Text fontSize={"3xl"} fontStyle={"italic"}>Trinity College Dublin&apos;s Computer Science Society</Text>

          <Text>As a student run society within Trinity College, the Dublin University Computer Science Society (DUCSS) was founded in 1980, and has grown over the years to become a community with over 500 members. As one of the earliest CS societies in Ireland, DUCSS has played a crucial role in shaping the future of tech within Trinity and Ireland.</Text>

          <Text>DUCSS is committed to community engagement and contributes to several tech-based charitable iniatives. Through events such as workshops, hackathons and panels, our members gain hands-on experience in the latest technologies, programming languages and industry practices. They also have the opportunity to network with our sponors and other society members through our various networking and social events.</Text>

        </VStack>

      </Card>

      <Card w={isTabletOrMobile ? "100%" : "60%"} m={"25px"}>
        <VStack p={"25px"}>
          <Heading>Meet the Committee</Heading>
          <Text>DUCSS functions thanks to the efforts of our hard working volunteers. Overall, there are
            15 roles in our organisation, with the 3 executive roles ensuring everyone works together smoothly.</Text>
          <Link href="/constitution.pdf"><Text>Check out our constitution!</Text></Link>
        </VStack>
      </Card>
      <SimpleGrid w={isTabletOrMobile ? "100%" : "60%"} columns={{ sm: 1, xl: 2, "2xl": 3 }} spacing={"25px"}>
        <CommitteeMember
          name={"Darragh Condron"}
          pronouns={"he/him"}
          role={"Chairperson"}
          picture={"/darragh.jpg"}
          bio={""}
        />
        <CommitteeMember
          name={"Manuel Araújo"}
          pronouns={"he/him"}
          role={"Treasurer"}
          picture={"/manel.jpg"}
          bio={"Hey everyone! I’m Manel, your new Treasurer for DUCSS. I’m going into my fourth year of ICS and my second year on the DUCSS committee and I will be responsible for dealing with the finances of the society to make sure we have the money to make the best possible events for all of you. Whenever I’m not doing that, I will probably be napping in the DUCSS room pretending lectures don’t exist or watching the latest F1 highlights."}
        />
        <CommitteeMember
          name={"Mia Rolfe"}
          pronouns={"she/her"}
          role={"Secretary"}
          picture={"/mia.jpg"}
          bio={"Hey everyone! I'm Mia, Secretary and former Tech Lead for DUCSS. Besides running meetings, planning events, and communicating with half the people at Estates and Facilities, I make sure the society doesn't implode. I also make video games. You can usually find me in the DUCSS room :)"}
        />
        <CommitteeMember
          name={"Leah Weldon"}
          pronouns={"she/her"}
          role={"PRO"}
          picture={"/leah.png"}
          bio={""}
        />
        <CommitteeMember
          name={"James Doyle"}
          pronouns={"he/him"}
          role={"Tech Lead"}
          picture={"/james.jpg"}
          bio={"Hey guys, I'm James, a 4th year ICS student, and I'm the new Tech Lead for DUCSS this year. I'll be taking care of the website for the year, and hopefully organising a heap of interesting guest lectures and workshops from a wide variety of fields within computer science, not just software engineering. In my spare time I work on personal projects and do a little writing. If you're looking for me, I'm probably in the library."}
        />
        <CommitteeMember
          name={"Martha Ryan"}
          pronouns={"she/her"}
          role={"Amenities Officer"}
          picture={"/martha.jpg"}
          bio={"Hey! I’m Martha your new amenities officer for the coming year. My job is to keep our room spick and span and stink free woohoo!! The DUCSS room is a great spot to hang out between lectures in the hammy and meet new people, hopefully see you there :)"}
        />
        <CommitteeMember
          name={"Ross Devine"}
          pronouns={"he/him"}
          role={"Competitions Officer"}
          picture={"/ross.png"}
          bio={"Hi! My name is Ross and I'm a Fourth Year ICS student doing my master's. This is my second year on DUCSS (as Competitions Officer), changing from Amenities Officer last year, and I'm excited for the change of pace. I love my personal coding projects (shameless DUCSS app plug) and you'll usually find me in the DUCSS room stressing about everything :))"}

        />
        <CommitteeMember
          name={"Ralf Duli"}
          pronouns={"he/him"}
          role={"Gaming Officer"}
          picture={"/ralf.jpg"}
          bio={"Hey there, I'm Ralf, Gaming Officer. I'm a Fourth Year Computer Science student. My interests include gaming, reading, and hitting legs in the gym. My role in DUCSS is to organise gaming-related events, so if you have any ideas, give myself or the society a DM!"}
        />
        <CommitteeMember
          name={"Daniel Guerin"}
          pronouns={"he/him"}
          role={"Events Officer"}
          picture={"/dan.png"}
          bio={"Hey, my name is Daniel and I've been around DUCSS for most of my time in college. Studying CS, as most of us are and really excited about this year's events. As Ents it's my job to run and host social events, whether that's a pub quiz or a collab with another society. Feel free to say hi to me if you ever see me at an event, and if you ever have any suggestions or idea for events lmk:^) Curly hair is probably one of my biggest personality traits and I'm known to play a game here or there."}
        />
        <CommitteeMember
          name={"Siddhi Srivastav"}
          pronouns={"she/her"}
          role={"CoderDojo Champion"}
          picture={"/siddhi.jpg"}
          bio={"Heyo! My name is Siddhi and I'm a Senior Fresher ICS student taking on the role of Coder Dojo Champion this year. My main interests involve staying the night in Trinity Central tackling assignments, using Bad Bunny's music as a stress-buster and schooling everyone at Mario Kart. My role will mainly involve organising and planning the coding workshops that DUCSS will host throughout the year as well as coordinating volunteers. I can't wait to meet you all at our future events (and display my amazing skills on the race track :))"}
        />
        <CommitteeMember
          name={"Ciara Quinn"}
          pronouns={"she/her"}
          role={"General Officer"}
          picture={"/ciara.jpeg"}
          bio={"Hey guys! I’m Ciara, a second-year Computer Science and Economics student, and I’ll be one of your general officers this year. My role involves supporting the overall operations of the society and assisting my fellow committee members. When I’m not busy studying, you’ll likely find me watching Formula 1, making Excel spreadsheets, or listening to music. I’m looking forward to an amazing year with all of you!"}
        />
        <CommitteeMember
          name={"Ellie Smith"}
          pronouns={"she/her"}
          role={"General Officer"}
          picture={"/ellie.png"}
          bio={"Hi everyone! I'm Ellie, one of your GOs for DUCSS this year!! I'm originally from the USA, I'm going into my fourth and final year of ICS, and I'm going into my third year on the DUCSS committee! You may remember me from my DUCSS Duck Meme Masterpieces at the end of every secretary email last year. I’m super excited to continue to be a part of DUCSS and make this year one to remember!"}
        />
        <CommitteeMember
          name={"Rohn Allen Santiago"}
          pronouns={"he/him"}
          role={"eSports Officer"}
          picture={"/rohn.jpg"}
          bio={"Hey everyone! My name is Rohn, I’m in 4th year CS, and this year I will be our eSports Officer. My job is to promote eSports and run events for anyone who is interested in competitive gaming. I will do my best to run events for people of all skill levels so I hope to see you there!"}
        />
        <CommitteeMember
          name={"Elizabeth Gogova"}
          pronouns={"she/her"}
          role={"Diversity and Inclusion Officer"}
          picture={"/elizabeth.jpg"}
          bio={"Hi everyone!! My name is Elizabeth, and this year I am going to be your Diversity and Inclusion Officer. I'm a student of Business and German here in trinity. I like programming in my free time :)) I'm very excited to meet you all during the course of this year!! <3"}
        />
      </SimpleGrid>
    </VStack>
  )
}