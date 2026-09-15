// place files you want to import through the `$lib` alias in this folder.

// Events -- instead of event objects they are maps for performance
/*  Event map keys + values - R! means required
    'Title' : R! Title string
    'Category' : R! 'Gaming', 'Technical', 'Social'
    'Start' : R! Start date
    'End' : End date
    'Date' : Empty string
    'Day' : Empty string
    'Month' : Empty string
    'Start Time' : Empty string
    'End Time' : Empty string or 'Late'
    'Location' : R! Location string
    'Sponsor' : Sponsor string
**/


export const committee = [
    new Map<string, any>([
        ['Name','Ayushmaan Kumar Yadav'],
        ['Title','Chair'],
        ['Course','5th Year Integrated Computer Science'],
        ['Role','Conductor of the DUCSS orchestra.']
    ]),
    new Map<string, any>([
        ['Name','Dimitris Charalampakis'],
        ['Title','Treasurer'],
        ['Course','2nd Year Integrated Computer Science'],
        ['Role',"I'm in charge of the accounts, meaning that I am responsible for tracking our accounts and expenditure throughout the year."]
    ]),
    new Map<string, any>([
        ['Name','Zara Braastad-Korhonen'],
        ['Title','Secretary'],
        ['Course','3rd Year Computer Science & Economics'],
        ['Role','I am responsible for sending the DUCSS weekly emails to keep everyone updated on upcoming events and career opportunities.']
    ]),
    new Map<string, any>([
        ['Name','Jacek Jedraszko'],
        ['Title','Public Relations Officer'],
        ['Course','2nd Year Computer Science & Economics'],
        ['Role','I take care of the DUCSS social media presence.']
    ]),
    new Map<string, any>([
        ['Name','Brynne Mittleider'],
        ['Title','Technical Lead'],
        ['Course','2nd Year Computer Science, Linguistics, & Spanish'],
        ['Role','I design the website, arrange workshops, and manage coding sessions. I also help support members on technical projects and learning.']
    ]),
    new Map<string, any>([
        ['Name','Raghav Rashgotra'],
        ['Title','Competitions Officer'],
        ['Course','2nd Year Integrated Computer Science'],
        ['Role','I organize computer science competitions and challenges to engage members of the society.']
    ]),
    new Map<string, any>([
        ['Name','Madalina Costovici'],
        ['Title','ENTS Officer'],
        ['Course','5th Year Integrated Computer Science'],
        ['Role','I handle all of the fun social events for the society, like pub quizzes and nights out.']
    ]),
    new Map<string, any>([
        ['Name','Xhainn Raza Muhammad'],
        ['Title','Gaming Officer'],
        ['Course','2nd Year Integrated Computer Science'],
        ['Role','I organize fun, chill gaming events for the society.']
    ]),
    new Map<string, any>([
        ['Name','Ethan Ó Mórdha'],
        ['Title','Gaming and Esports Officer'],
        ['Course','2nd Year Computer Science, Linguistics, & Irish'],
        ['Role','I organize fun gaming and Esports events.']
    ]),
    new Map<string, any>([
        ['Name','Darren McCabe'],
        ['Title','Amenities Officer'],
        ['Course','Computer Science, Security, & Forensics'],
        ['Role','One of the unsung heroes of DUCSS, I keep the room clean, organized, stocked, and a great place for members to hang out.']
    ]),
    new Map<string, any>([
        ['Name','Isabelle Guey'],
        ['Title','Volunteer & Outreach Officer'],
        ['Course','2nd Year Computer Science & Linguistics'],
        ['Role','I help organize and lead coding workshops for kids with CoderDojo.']
    ]),
    new Map<string, any>([
        ['Name','Kyrylo Borovyk'],
        ['Title','General Officer'],
        ['Course','2nd Year Integrated Computer Science'],
        ['Role','I support day-to-day operations and team tasks.']
    ]),
    new Map<string, any>([
        ['Name','Ahaan Singh'],
        ['Title','General Officer'],
        ['Course','2nd Year Integrated Computer Science'],
        ['Role','I assist all committee members with their duties, and any other things they may need help with.']
    ])
]
 export const events = [
    new Map<string, any>([
        ['Title', 'Jackbox Games Night'],
        ['Category','Gaming'],
        ['Start', new Date(2026, 8, 16, 18, 30)],
        ['End', new Date(2026, 8, 16, 20, 30)],
        ['Date',''],
        ['Day',''],
        ['Month',''],
        ['Start Time',''],
        ['End Time','Late'],
        ['Location', 'DUCSS Room'],
        ['Sponsor', null],
        [
            'Description',
            'Enjoy a casual night of Jackbox gaming, perfect for new members wanting to check out the DUCSS Room.'
        ]
    ]),
    new Map<string, any>([
        ['Title', 'White Lies T-Shirt Pub Crawl'],
        ['Category','Social'],
        ['Start', new Date(2026, 8, 17, 18, 30)],
        ['End', null],
        ['Date',''],
        ['Day',''],
        ['Month',''],
        ['Start Time',''],
        ['End Time','Late'],
        ['Location', 'Meet at the Pav'],
        ['Sponsor', null],
        [
            'Description',
            'Kick off the night at the Pav by bringing a white shirt (some are provided) and writing on it your best white lie to show off as we meander through Dublin the rest of the night.'
        ]
    ]),
    new Map<string, any>([
        ['Title', 'Beerio Kart w/ a Live Band'],
        ['Category','Gaming'],
        ['Start', new Date(2026, 8, 21, 19, 30)],
        ['End', null],
        ['Date',''],
        ['Day',''],
        ['Month',''],
        ['Start Time',''],
        ['End Time','Late'],
        ['Location', 'Marquee in Front of the Pav'],
        ['Sponsor', null],
        [
            'Description',
            'Serenaded by a live band playing Mario Kart music, watch or join an epic tournament between the Hist, DUCSS, and Trinity ENTS.'
        ]
    ]),
    new Map<string, any>([
        ['Title', 'Coffee Hour'],
        ['Category','Social'],
        ['Start', new Date(2026, 8, 22, 12, 0)],
        ['End', new Date(2026, 8, 22, 14, 0)],
        ['Date',''],
        ['Day',''],
        ['Month',''],
        ['Start Time',''],
        ['End Time','Late'],
        ['Location', 'DUCSS Room'],
        ['Sponsor', null],
        [
            'Description',
            'Chill and snack at our repeat Coffee Hour in the room, with tea and coffee provided. Please complete this request form if you have accommodation needs related to milks, beverages and snacks: https://forms.gle/GAMwQHsBcR8rncbj7.'
        ]
    ])
];
export const sponsors = [
    new Map<string, any>([
        ['Title', 'Arista Networks'],
        ['Description', 'Arista Networks is a global technology company specialising in cloud networking and high-performance networking solutions for data centres, AI infrastructure, campuses and enterprise environments. Its technology combines networking hardware with its software-driven EOS platform, with a strong focus on automation, reliability and large-scale systems. Arista offers opportunities particularly relevant to students interested in software engineering, networking, distributed systems and cloud infrastructure.'],
        ['Photo', '/sponsors/arista.png']
    ]),
    new Map<string, any>([
        ['Title', 'Millennium'],
        ['Description', 'Millennium is a global, diversified alternative investment firm founded in 1989. The firm brings together hundreds of specialised investment teams operating across global financial markets, supported by large-scale technology and infrastructure. For Computer Science students, Millennium provides exposure to the intersection of software engineering, data, quantitative finance and technology within financial markets.'],
        ['Photo', '/sponsors/millenium.png']
    ]),
    new Map<string, any>([
        ['Title', 'Stripe'],
        ['Description', "Stripe is a technology company that builds economic infrastructure for the internet. Its software enables businesses ranging from startups to some of the world's largest companies to accept payments, manage online businesses and build financial products. Stripe has dual headquarters in Dublin and San Francisco, making it particularly relevant to Ireland's technology ecosystem and students interested in software engineering, distributed systems, fintech and internet infrastructure."],
        ['Photo', '/sponsors/stripe.png']
    ]),
    new Map<string, any>([
        ['Title', 'PwC'],
        ['Description', "PwC is one of Ireland's largest professional services firms, providing services across audit, tax and advisory. Its teams work with organisations ranging from startups to major global companies, increasingly combining business expertise with technology, data and digital transformation. PwC provides students with opportunities to explore careers spanning technology consulting, cybersecurity, data and analytics, business transformation and professional services."],
        ['Photo', '/sponsors/PWC.png']
    ]),
    new Map<string, any>([
        ['Title', 'Bloomberg'],
        ['Description', "Bloomberg is a global financial, software, data and media company that uses technology to provide financial professionals with real-time information, analytics and news. Technology sits at the centre of Bloomberg's products, including the Bloomberg Terminal, with thousands of engineers and technologists working across areas such as software engineering, data, AI, machine learning and financial systems."],
        ['Photo', '/sponsors/bloomberg.png']
    ]),
    new Map<string, any>([
        ['Title', 'MongoDB'],
        ['Description', 'MongoDB is a global software company best known for its modern document database and cloud data platform. Its technology is designed to give developers a flexible and scalable way to build and operate modern applications, with MongoDB Atlas providing its database platform in the cloud. MongoDB is particularly relevant to students interested in databases, backend engineering, distributed systems, cloud computing and developer tools.'],
        ['Photo', '/sponsors/MongoDB.png']
    ]),
    new Map<string, any>([
        ['Title', 'Susquehanna International Group (SIG)'],
        ['Description', 'Susquehanna is a global quantitative trading firm that brings together technology, quantitative research and trading to operate across financial markets. Founded in 1987, the firm uses mathematics, probability, data and technology to solve complex problems and make decisions under uncertainty. SIG is particularly relevant to students interested in software engineering, quantitative trading, algorithms, machine learning, mathematics and financial technology.'],
        ['Photo', '/sponsors/SIG.png']
    ])
]

for (const event of events) {
    // Make a tag in each event map for Date, Day, Month, Start Time, and End Time
    const start = event.get('Start');
    const end = event.get('End');
    if (start != null) {
        event.set('Date',start.getDate());
        let day = '';
        switch (start.getDay()) {
        case 0:
            day = 'Sunday';
            break;
        case 1:
            day = 'Monday';
            break;
        case 2:
            day = 'Tuesday';
            break;
        case 3:
            day = 'Wednesday';
            break;
        case 4:
            day = 'Thursday';
            break;
        case 5:
            day = 'Friday';
            break;
        case 6:
            day = 'Saturday';
            break;
        }
        event.set('Day',day);
        event.set('Month',start.toLocaleString('default', { month: 'long' }));
        event.set('Start Time',
            `${start.getHours()}:${start.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`);
    }
    if (end != null) {
        event.set('End Time',
            `${end.getHours()}:${end.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`);
    }
}



/* References

For making the minutes of times double digits
https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers/31466357#31466357

For embedding JS in Strings
https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Strings

For making columns of css grid equal width
https://stackoverflow.com/questions/47601564/equal-width-columns-in-css-grid

For outlining text in css
https://stackoverflow.com/questions/4919076/outline-effect-to-text

For different borders per side in css
https://www.w3schools.com/css/css_border_sides.asp

For using calc()
https://stackoverflow.com/questions/25205039/is-it-possible-to-get-a-negative-value-with-css-calcate

Hiding image overflow
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow

Making grainy noisy div for images
https://codepen.io/nadavios/pen/gbOKNpm

Hiding scrollbar
https://www.reddit.com/r/css/comments/1aop4i1/i_just_learned_how_to_hide_the_page_scroll_bar/
**/

