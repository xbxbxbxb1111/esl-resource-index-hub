import { mkdir, writeFile } from "node:fs/promises";

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const categorySeeds = [
  {
    id: "speaking-topics",
    slug: "speaking-topics",
    title: "Speaking Topics",
    description:
      "Everyday speaking topics for adult ESL classes, organized from personal identity to picture description.",
    audience: "Adult speaking classes",
    accent: "#3f6f64",
    levelRange: ["A1", "A2"],
    skills: ["Speaking", "Functional English", "Vocabulary"],
    groups: [
      {
        title: "Personal Life & Identity",
        topics: [
          "Self-introduction",
          "Name, Age & Nationality",
          "Where Are You From?",
          "Personal Background",
          "What Do You Do?",
          "Talking About Your Personality",
          "Talking About Your Strengths",
          "Talking About Your Weaknesses",
          "Personal Goals",
          "Life Changes"
        ]
      },
      {
        title: "Daily Life & Routine",
        topics: [
          "Morning Routine",
          "Evening Routine",
          "Weekday Schedule",
          "Weekend Routine",
          "Daily Habits",
          "Time Management",
          "Housework",
          "Getting Ready",
          "A Busy Day",
          "A Lazy Day"
        ]
      },
      {
        title: "Family, Friends & Relationships",
        topics: [
          "Talking About Family",
          "Describing Family Members",
          "Talking About Parents",
          "Talking About Children",
          "Talking About Friends",
          "Making New Friends",
          "Keeping in Touch",
          "Dating & Relationships",
          "Neighbor Talk",
          "Social Problems"
        ]
      },
      {
        title: "Food, Drinks & Restaurants",
        topics: [
          "Favorite Food",
          "Ordering Coffee",
          "Ordering Fast Food",
          "Ordering in a Restaurant",
          "Asking About Ingredients",
          "Talking About Taste",
          "Cooking at Home",
          "Eating Out",
          "Paying the Bill",
          "Complaining at a Restaurant"
        ]
      },
      {
        title: "Shopping, Money & Services",
        topics: [
          "Shopping for Clothes",
          "Shopping for Groceries",
          "Asking for Price",
          "Bargaining",
          "Returning an Item",
          "Online Shopping",
          "Talking About Discounts",
          "Paying by Cash or Card",
          "Booking a Service",
          "Customer Service Problems"
        ]
      },
      {
        title: "Work, Jobs & Study",
        topics: [
          "Talking About Jobs",
          "Daily Work Tasks",
          "Talking About Your Company",
          "Talking About Your School",
          "Asking About Someone's Job",
          "Work Problems",
          "Study Problems",
          "Learning English",
          "Future Career Plans",
          "Work-Life Balance"
        ]
      },
      {
        title: "Home, City & Places",
        topics: [
          "Describing Your Home",
          "Rooms and Furniture",
          "Renting an Apartment",
          "Talking About Your City",
          "Giving Directions",
          "Asking for Directions",
          "Public Places",
          "At the Bank",
          "At the Post Office",
          "At the Hair Salon"
        ]
      },
      {
        title: "Health, Body & Lifestyle",
        topics: [
          "Talking About Health",
          "Body Parts",
          "Feeling Sick",
          "Seeing a Doctor",
          "Medicine and Pharmacy",
          "Exercise and Fitness",
          "Sleep Problems",
          "Healthy Eating",
          "Stress and Relaxation",
          "Bad Habits"
        ]
      },
      {
        title: "Feelings, Opinions & Personality",
        topics: [
          "Talking About Feelings",
          "Nervous, Excited and Confident",
          "Likes and Dislikes",
          "Giving Opinions",
          "Asking for Opinions",
          "Agreeing",
          "Disagreeing",
          "Comparing Choices",
          "Making Decisions",
          "Explaining Reasons"
        ]
      },
      {
        title: "Plans, Events & Social Life",
        topics: [
          "Making Plans",
          "Inviting Someone",
          "Accepting an Invitation",
          "Refusing an Invitation",
          "Changing Plans",
          "Meeting Friends",
          "Parties and Events",
          "Holidays and Festivals",
          "Talking About Weekend Plans",
          "Talking About Past Events"
        ]
      },
      {
        title: "Technology, Media & Online Life",
        topics: [
          "Using a Smartphone",
          "Social Media",
          "Online Videos",
          "Online Games",
          "Online Meetings",
          "Messaging Apps",
          "Taking Photos",
          "Internet Problems",
          "Talking About Apps",
          "Digital Habits"
        ]
      },
      {
        title: "Picture Talk & Description",
        topics: [
          "Describing People",
          "Describing Clothes",
          "Describing Actions",
          "Describing Places",
          "Describing Weather",
          "Describing Feelings",
          "Describing Objects",
          "Describing Position",
          "Comparing Two Pictures",
          "Telling a Story from a Picture"
        ]
      }
    ]
  },
  {
    id: "travel-english",
    slug: "travel-english",
    title: "Travel English",
    description:
      "Travel communication topics for flights, hotels, immigration, directions, shopping, and emergencies.",
    audience: "Travel English classes",
    accent: "#4f83a1",
    levelRange: ["A1", "A2"],
    skills: ["Speaking", "Travel English", "Listening"],
    groups: [
      {
        title: "Before the Trip",
        topics: [
          "Booking a Flight",
          "Choosing a Hotel",
          "Packing a Suitcase",
          "Travel Documents",
          "Visa Questions",
          "Travel Insurance",
          "Planning an Itinerary",
          "Asking About Travel Rules"
        ]
      },
      {
        title: "Airport & Flight",
        topics: [
          "Airport Check-in",
          "Seat Selection",
          "Baggage Allowance",
          "Security Check",
          "Airport Directions",
          "Waiting Lounge",
          "Boarding",
          "Flight Delay"
        ]
      },
      {
        title: "Immigration, Baggage & Customs",
        topics: [
          "Immigration Questions",
          "Purpose of Visit",
          "Length of Stay",
          "Address Abroad",
          "Baggage Claim",
          "Lost Luggage",
          "Customs Declaration",
          "Prohibited and Restricted Items"
        ]
      },
      {
        title: "Hotel & Accommodation",
        topics: [
          "Hotel Check-in",
          "Room Types",
          "Asking for Hotel Services",
          "Room Problems",
          "Hotel Breakfast",
          "Checking Out",
          "Asking for Late Check-out",
          "Airbnb or Homestay Check-in"
        ]
      },
      {
        title: "Transport & Directions",
        topics: [
          "Taking a Taxi",
          "Taking a Bus",
          "Taking a Train",
          "Buying a Ticket",
          "Asking for Directions",
          "Using a Map",
          "Renting a Car",
          "Ride-hailing Apps"
        ]
      },
      {
        title: "Food, Shopping & Emergency",
        topics: [
          "Ordering Food Abroad",
          "Food Allergies",
          "Buying Souvenirs",
          "Bargaining at a Market",
          "Asking for Tax Refund",
          "Lost Passport",
          "Medical Emergency",
          "Asking Police or Staff for Help"
        ]
      }
    ]
  },
  {
    id: "listening-courses",
    slug: "listening-courses",
    title: "Listening Courses",
    description:
      "Curated ESL listening website indexes for A1-A2 learners, centered on audio, transcripts, quizzes, vocabulary support, and downloadable practice materials.",
    audience: "A1-A2 listening classes",
    accent: "#6f7f4f",
    levelRange: ["A1", "A2"],
    skills: ["Listening", "Transcript Work", "Vocabulary"],
    groups: [
      {
        title: "Daily Life Listening",
        topics: [
          "Self-introduction Listening",
          "Daily Routine Listening",
          "Family Conversation Listening",
          "Shopping Conversation Listening",
          "Restaurant Conversation Listening",
          "Weather Conversation Listening",
          "Hobbies Conversation Listening",
          "Weekend Plans Listening"
        ]
      },
      {
        title: "Travel Listening",
        topics: [
          "Airport Announcement Listening",
          "Check-in Conversation Listening",
          "Immigration Conversation Listening",
          "Hotel Check-in Listening",
          "Asking for Directions Listening",
          "Taxi Conversation Listening",
          "Restaurant Abroad Listening",
          "Travel Problem Listening"
        ]
      },
      {
        title: "Business Listening",
        topics: [
          "Workplace Small Talk Listening",
          "Meeting Conversation Listening",
          "Business Phone Call Listening",
          "Scheduling Conversation Listening",
          "Giving Updates Listening",
          "Email Summary Listening",
          "Customer Service Listening",
          "Interview Listening"
        ]
      },
      {
        title: "Native Conversation Listening",
        topics: [
          "Agreeing and Disagreeing Listening",
          "Suggestions Listening",
          "Polite Refusal Listening",
          "Showing Interest Listening",
          "Reacting to News Listening",
          "Small Talk Listening",
          "Conversation Fillers Listening",
          "Problem-solving Listening"
        ]
      },
      {
        title: "News & Real-world Listening",
        topics: [
          "Simple News Listening",
          "Weather News Listening",
          "Travel News Listening",
          "Business News Listening",
          "Technology News Listening",
          "Culture News Listening",
          "Health News Listening",
          "Human Interest Story Listening"
        ]
      },
      {
        title: "Test-style Listening",
        topics: [
          "Picture-based Listening",
          "Short Dialogue Listening",
          "Long Dialogue Listening",
          "Announcement Listening",
          "Number and Time Listening",
          "Location Listening",
          "Opinion Listening",
          "Main Idea Listening"
        ]
      }
    ]
  },
  {
    id: "business-english",
    slug: "business-english",
    title: "Business English",
    description:
      "Professional communication topics for workplace basics, email, meetings, presentations, scheduling, HR, and feedback.",
    audience: "Workplace English classes",
    accent: "#596f9d",
    levelRange: ["A2", "B1"],
    skills: ["Business Communication", "Speaking", "Writing"],
    groups: [
      {
        title: "Workplace Basics",
        topics: [
          "Professional Self-introduction",
          "Talking About Your Role",
          "Talking About Your Department",
          "Describing Your Company",
          "Describing Products or Services",
          "Workplace Small Talk",
          "Office Daily Routine",
          "Talking About Responsibilities",
          "Asking About a Colleague's Work",
          "Explaining Your Work Process"
        ]
      },
      {
        title: "Email & Written Communication",
        topics: [
          "Writing a Polite Email",
          "Email Greetings and Closings",
          "Request Emails",
          "Replying to Emails",
          "Follow-up Emails",
          "Reminder Emails",
          "Apology Emails",
          "Complaint Emails",
          "Attachment and Document Emails",
          "Formal vs Natural Email Tone"
        ]
      },
      {
        title: "Meetings & Discussions",
        topics: [
          "Starting a Meeting",
          "Setting the Agenda",
          "Asking for Opinions",
          "Giving Opinions in a Meeting",
          "Agreeing in a Meeting",
          "Disagreeing Politely",
          "Interrupting Politely",
          "Clarifying Points",
          "Summarizing Decisions",
          "Ending a Meeting"
        ]
      },
      {
        title: "Presentations & Reporting",
        topics: [
          "Opening a Presentation",
          "Introducing a Topic",
          "Explaining a Chart",
          "Describing Trends",
          "Reporting Progress",
          "Giving a Project Update",
          "Explaining Problems",
          "Making Recommendations",
          "Handling Q&A",
          "Closing a Presentation"
        ]
      },
      {
        title: "Phone, Online Meetings & Scheduling",
        topics: [
          "Business Phone Calls",
          "Leaving a Voicemail",
          "Taking a Message",
          "Scheduling a Meeting",
          "Rescheduling a Meeting",
          "Confirming an Appointment",
          "Joining an Online Meeting",
          "Screen Sharing",
          "Technical Problems in Online Meetings",
          "Ending a Call Politely"
        ]
      },
      {
        title: "Professional Communication Skills",
        topics: [
          "Asking for Clarification",
          "Checking Understanding",
          "Giving Suggestions",
          "Making Requests Politely",
          "Refusing Requests Politely",
          "Asking for Help at Work",
          "Offering Help at Work",
          "Giving Bad News",
          "Softening Direct Language",
          "High-EQ Workplace Replies"
        ]
      },
      {
        title: "HR, Job Search & Office Culture",
        topics: [
          "Job Interview Self-introduction",
          "Talking About Strengths",
          "Talking About Weaknesses",
          "Explaining Work Experience",
          "Asking Interview Questions",
          "Writing a CV or Resume",
          "Cover Letters",
          "Workplace Rules",
          "Asking for Leave",
          "Workplace Culture Differences"
        ]
      },
      {
        title: "Management, Problems & Feedback",
        topics: [
          "Giving Feedback",
          "Receiving Feedback",
          "Handling Complaints",
          "Solving Workplace Problems",
          "Dealing with Delays",
          "Explaining Mistakes",
          "Apologizing Professionally",
          "Negotiating Internally",
          "Managing Conflict",
          "Motivating a Team"
        ]
      }
    ]
  },
  {
    id: "foreign-trade-english",
    slug: "foreign-trade-english",
    title: "Foreign Trade English",
    description:
      "Export and trade communication topics for products, inquiries, quotations, samples, orders, production, shipping, and after-sales.",
    audience: "Foreign trade and export English classes",
    accent: "#9a6a3d",
    levelRange: ["A1", "A2"],
    skills: ["Trade Communication", "Email", "Negotiation"],
    groups: [
      {
        title: "Company, Product & Market",
        topics: [
          "Introducing Your Company",
          "Introducing Your Factory",
          "Introducing Your Product",
          "Product Features",
          "Product Advantages",
          "Product Materials",
          "Product Size and Specifications",
          "Product Catalog",
          "Target Market",
          "Competitor Comparison"
        ]
      },
      {
        title: "Inquiry & Customer Development",
        topics: [
          "Replying to an Inquiry",
          "Asking Customer Needs",
          "Confirming Product Requirements",
          "Asking About Quantity",
          "Asking About Target Price",
          "Asking About Destination Port",
          "Following Up a Potential Buyer",
          "Reviving an Old Customer",
          "Alibaba Inquiry Reply",
          "WhatsApp First Contact"
        ]
      },
      {
        title: "Quotation, Price & Negotiation",
        topics: [
          "Sending a Quotation",
          "Explaining Price",
          "FOB Price",
          "CIF Price",
          "EXW Price",
          "Price Negotiation",
          "Discount for Bulk Orders",
          "Price Increase Explanation",
          "Validity of Quotation",
          "Handling \"Too Expensive\""
        ]
      },
      {
        title: "Samples, MOQ & Customization",
        topics: [
          "Sample Request",
          "Sample Fee",
          "Sample Delivery Time",
          "Sample Refund Policy",
          "MOQ Explanation",
          "Trial Order",
          "Custom Logo",
          "Custom Packaging",
          "OEM / ODM",
          "Confirming Sample Details"
        ]
      },
      {
        title: "Orders, Payment & Contracts",
        topics: [
          "Proforma Invoice",
          "Order Confirmation",
          "Purchase Order",
          "Payment Terms",
          "Deposit and Balance",
          "T/T Payment",
          "L/C Payment",
          "Contract Clauses",
          "Revising Contract Terms",
          "Confirming Order Details"
        ]
      },
      {
        title: "Production, Quality & Packaging",
        topics: [
          "Production Schedule",
          "Production Delay",
          "Production Update",
          "Quality Standard",
          "Inspection Arrangement",
          "Inspection Report",
          "Defective Products",
          "Packaging Requirements",
          "Carton Marks",
          "Product Photos Before Shipment"
        ]
      },
      {
        title: "Shipping, Documents & Customs",
        topics: [
          "Shipping Method",
          "Sea Freight",
          "Air Freight",
          "Courier Delivery",
          "Delivery Time",
          "Shipping Address",
          "Commercial Invoice",
          "Packing List",
          "Bill of Lading",
          "Certificate of Origin"
        ]
      },
      {
        title: "After-sales, Claims & Relationship Maintenance",
        topics: [
          "After-sales Service",
          "Handling Customer Complaints",
          "Requesting Photos or Videos",
          "Offering Replacement",
          "Offering Refund",
          "Discussing Compensation",
          "Asking for Feedback",
          "Asking for Repeat Orders",
          "Holiday Greetings to Clients",
          "Maintaining Long-term Cooperation"
        ]
      }
    ]
  },
  {
    id: "native-phrases",
    slug: "native-phrases",
    title: "Native Phrases",
    description:
      "Natural phrase categories for conversation management, reactions, opinions, requests, softening, small talk, workplace replies, and problem-solving.",
    audience: "Natural English phrase classes",
    accent: "#b96f54",
    levelRange: ["A1", "A2"],
    skills: ["Natural Phrases", "Speaking", "Pragmatics"],
    groups: [
      {
        title: "Conversation Management",
        topics: [
          "Starting a Conversation",
          "Keeping a Conversation Going",
          "Changing the Topic",
          "Ending a Conversation",
          "Buying Time",
          "Conversation Fillers",
          "Checking Understanding",
          "Asking Follow-up Questions",
          "Showing You Are Listening",
          "Repairing Misunderstanding"
        ]
      },
      {
        title: "Reactions & Emotions",
        topics: [
          "Reacting to Good News",
          "Reacting to Bad News",
          "Showing Surprise",
          "Showing Interest",
          "Showing Sympathy",
          "Showing Excitement",
          "Showing Nervousness",
          "Showing Disappointment",
          "Showing Relief",
          "Showing Frustration"
        ]
      },
      {
        title: "Opinions & Discussion",
        topics: [
          "Giving Opinions Naturally",
          "Asking for Opinions",
          "Agreeing Naturally",
          "Disagreeing Softly",
          "Partly Agreeing",
          "Comparing Options",
          "Explaining Reasons",
          "Giving Examples",
          "Challenging an Idea Politely",
          "Summarizing Your Point"
        ]
      },
      {
        title: "Suggestions, Requests & Refusals",
        topics: [
          "Making Suggestions",
          "Accepting Suggestions",
          "Rejecting Suggestions Politely",
          "Making Requests",
          "Asking for a Favor",
          "Refusing a Request",
          "Offering Help",
          "Accepting Help",
          "Declining Help",
          "Asking for Permission"
        ]
      },
      {
        title: "Politeness & Softening",
        topics: [
          "Sounding More Polite",
          "Softening Direct Questions",
          "Softening Direct Requests",
          "Softening Negative Feedback",
          "Avoiding \"No\" Directly",
          "Using Maybe / Kind of / Sort of",
          "Using I was wondering if",
          "Using Would it be possible to",
          "Polite Follow-ups",
          "Gentle Reminders"
        ]
      },
      {
        title: "Social Small Talk",
        topics: [
          "Talking About the Weekend",
          "Talking About the Weather",
          "Complimenting Someone",
          "Responding to Compliments",
          "Asking About Plans",
          "Catching Up",
          "Long Time No See",
          "Talking About Food",
          "Talking About Travel",
          "Talking About Work Casually"
        ]
      },
      {
        title: "Workplace Native Phrases",
        topics: [
          "Professional Small Talk",
          "Saying You Are Busy",
          "Asking for More Time",
          "Saying You Don't Understand",
          "Saying You Made a Mistake",
          "Saying Something Is Not Possible",
          "Following Up Politely",
          "Pushing Back Politely",
          "Giving a Quick Update",
          "Saying \"No\" at Work"
        ]
      },
      {
        title: "Problem-solving Phrases",
        topics: [
          "Reporting a Problem",
          "Describing What Went Wrong",
          "Apologizing Naturally",
          "Explaining a Delay",
          "Offering a Solution",
          "Asking for Patience",
          "Asking Someone to Check",
          "Confirming the Next Step",
          "De-escalating Conflict",
          "Closing the Problem Politely"
        ]
      }
    ]
  },
  {
    id: "teacher-toolkit",
    slug: "teacher-toolkit",
    title: "Teacher Toolkit",
    description:
      "Reusable teacher assets for prompts, templates, cards, warm-ups, games, class structures, and assessment forms.",
    audience: "ESL teachers and curriculum builders",
    accent: "#7b6aa8",
    levelRange: ["A1", "A2"],
    skills: ["Teacher Planning", "Materials Design", "Assessment"],
    groups: [
      { title: "PPT Prompts", topics: ["PPT Prompts"] },
      { title: "Handout Templates", topics: ["Handout Templates"] },
      { title: "Dialogue Templates", topics: ["Dialogue Templates"] },
      { title: "Role-play Cards", topics: ["Role-play Cards"] },
      { title: "Picture Talk Materials", topics: ["Picture Talk Materials"] },
      { title: "Warm-up Questions", topics: ["Warm-up Questions"] },
      { title: "Game Templates", topics: ["Game Templates"] },
      { title: "Listening Class Templates", topics: ["Listening Class Templates"] },
      { title: "Reading Class Templates", topics: ["Reading Class Templates"] },
      { title: "Grammar-through-Speaking Templates", topics: ["Grammar-through-Speaking Templates"] },
      { title: "Lesson Flow Templates", topics: ["Lesson Flow Templates"] },
      { title: "Assessment & Feedback Forms", topics: ["Assessment & Feedback Forms"] }
    ]
  }
];

const categoryOrder = [
  "speaking-topics",
  "listening-courses",
  "travel-english",
  "business-english",
  "foreign-trade-english",
  "native-phrases",
  "teacher-toolkit"
];

function groupSummary(groupTitle, categoryTitle) {
  if (categoryTitle === "Teacher Toolkit") {
    return `Reusable ${groupTitle.toLowerCase()} resources for ESL teachers.`;
  }

  return `${groupTitle} resource index for ${categoryTitle.toLowerCase()} classes.`;
}

const categories = categorySeeds
  .map((category) => {
    const groups = category.groups.map((group) => {
      const groupSlug = slugify(group.title);
      return {
        id: `${category.slug}-${groupSlug}`,
        slug: groupSlug,
        title: group.title,
        summary: groupSummary(group.title, category.title),
        topicCount: group.topics.length
      };
    });

    return {
      id: category.id,
      slug: category.slug,
      title: category.title,
      description: category.description,
      audience: category.audience,
      levelRange: category.levelRange,
      groupCount: groups.length,
      totalTopics: groups.reduce((sum, group) => sum + group.topicCount, 0),
      accent: category.accent,
      groups
    };
  })
  .sort((a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id));

const topics = categorySeeds.flatMap((category) =>
  category.groups.flatMap((group) => {
    const groupSlug = slugify(group.title);
    return group.topics.map((topicTitle) => {
      const topicSlug = slugify(topicTitle);
      return {
        id: `${category.slug}-${groupSlug}-${topicSlug}`,
        slug: `${category.slug}-${groupSlug}-${topicSlug}`,
        title: topicTitle,
        mainCategoryId: category.id,
        mainCategory: category.title,
        mainCategorySlug: category.slug,
        topicGroupId: `${category.slug}-${groupSlug}`,
        topicGroup: group.title,
        topicGroupSlug: groupSlug,
        levelRange: category.levelRange,
        skills: category.skills,
        isListeningTopic: category.id === "listening-courses"
      };
    });
  })
);

const topicId = (categorySlug, groupTitle, topicTitle) =>
  `${categorySlug}-${slugify(groupTitle)}-${slugify(topicTitle)}`;

function resource(topic, data) {
  return {
    topicId: topic,
    downloadable: false,
    resourceFeatures: [],
    priority: "Secondary",
    ...data
  };
}

const curatedResourceBatches = [
  {
    categorySlug: "speaking-topics",
    groupTitle: "Personal Life & Identity",
    topicTitle: "What Do You Do?",
    resources: [
      {
        type: "Vocabulary Notes",
        title: "British Council LearnEnglish: Jobs 1",
        url: "https://learnenglish.britishcouncil.org/free-resources/vocabulary/a1-a2/jobs-1",
        source: "British Council LearnEnglish",
        level: "A1-A2",
        notes: "A1-A2 job vocabulary page teachers can use before short work and occupation speaking tasks.",
        resourceFeatures: ["Vocabulary", "Exercises"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Jobs Vocabulary",
        url: "https://www.englishclub.com/vocabulary/jobs.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Job vocabulary reference for building simple answers to 'What do you do?' questions.",
        resourceFeatures: ["Vocabulary", "Reference"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Daily Life & Routine",
    topicTitle: "Morning Routine",
    resources: [
      {
        type: "Vocabulary Notes",
        title: "British Council LearnEnglish: Daily routine",
        url: "https://learnenglish.britishcouncil.org/free-resources/vocabulary/a1-a2/daily-routine",
        source: "British Council LearnEnglish",
        level: "A1",
        notes: "Interactive vocabulary page for common daily routine verbs and timing language.",
        resourceFeatures: ["Vocabulary", "Exercises"],
        priority: "Primary"
      },
      {
        type: "ESL Listening Website",
        title: "Randall's ESL Cyber Listening Lab: Daily Schedule",
        url: "https://www.esl-lab.com/easy/daily-schedule/",
        source: "Randall's ESL Cyber Listening Lab",
        level: "A1-A2",
        notes: "Listening page that supports routine speaking practice with audio, quiz, and transcript support.",
        resourceFeatures: ["Audio", "Quiz", "Transcript", "Vocabulary"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Family, Friends & Relationships",
    topicTitle: "Talking About Family",
    resources: [
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Family Vocabulary",
        url: "https://www.englishclub.com/vocabulary/family.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Family member vocabulary reference for beginner family-description speaking tasks.",
        resourceFeatures: ["Vocabulary", "Reference", "Quiz"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "EnglishClub: 200 Example Sentences",
        url: "https://www.englishclub.com/grammar/sentence/examples.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Closely related sentence-bank page with family and friends examples for controlled speaking support.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Food, Drinks & Restaurants",
    topicTitle: "Ordering Coffee",
    resources: [
      {
        type: "ESL Listening Website",
        title: "British Council LearnEnglish: Ordering in a cafe",
        url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/ordering-cafe",
        source: "British Council LearnEnglish",
        level: "A1",
        notes: "Cafe-ordering listening page that teachers can link as input before coffee-order role practice.",
        resourceFeatures: ["Audio", "Transcript", "Exercises"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Restaurant English",
        url: "https://www.englishclub.com/efl/survival/restaurant-english/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Survival English page with restaurant language that also fits simple coffee counter exchanges.",
        resourceFeatures: ["Audio", "Vocabulary", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Food, Drinks & Restaurants",
    topicTitle: "Ordering in a Restaurant",
    resources: [
      {
        type: "ESL Listening Website",
        title: "British Council LearnEnglish: Booking a table",
        url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/booking-table",
        source: "British Council LearnEnglish",
        level: "A1",
        notes: "Restaurant booking listening resource with transcript and exercises for pre-speaking input.",
        resourceFeatures: ["Audio", "Transcript", "Exercises"],
        priority: "Primary"
      },
      {
        type: "ESL Listening Website",
        title: "Randall's ESL Cyber Listening Lab: Restaurants",
        url: "https://www.esl-lab.com/basic-english/restaurants/",
        source: "Randall's ESL Cyber Listening Lab",
        level: "A1-A2",
        notes: "Restaurant listening page with audio, quiz, and script support for ordering practice.",
        resourceFeatures: ["Audio", "Quiz", "Script"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Shopping, Money & Services",
    topicTitle: "Shopping for Clothes",
    resources: [
      {
        type: "ESL Listening Website",
        title: "British Council LearnEnglish: Shopping for clothes",
        url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/shopping-clothes",
        source: "British Council LearnEnglish",
        level: "A1",
        notes: "Shop conversation listening page with transcript and exercises for clothing-store speaking tasks.",
        resourceFeatures: ["Audio", "Transcript", "Exercises"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "British Council LearnEnglish: Clothes 1",
        url: "https://learnenglish.britishcouncil.org/free-resources/vocabulary/a1-a2/clothes-1",
        source: "British Council LearnEnglish",
        level: "A1-A2",
        notes: "Clothing vocabulary page for preparing size, color, and item-name practice.",
        resourceFeatures: ["Vocabulary", "Exercises"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Home, City & Places",
    topicTitle: "Asking for Directions",
    resources: [
      {
        type: "ESL Listening Website",
        title: "British Council LearnEnglish: Finding the library",
        url: "https://learnenglish.britishcouncil.org/skills/listening/a1-listening/finding-library",
        source: "British Council LearnEnglish",
        level: "A1",
        notes: "A1 directions listening page with transcript and exercises for location question practice.",
        resourceFeatures: ["Audio", "Transcript", "Exercises"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: How to Give Directions",
        url: "https://www.englishclub.com/efl/survival/how-to-give-directions/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Survival English page for direction phrases, useful for map-based speaking drills.",
        resourceFeatures: ["Audio", "Functional Language", "Reference"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Health, Body & Lifestyle",
    topicTitle: "Feeling Sick",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: How To Go to a Walk-in Clinic",
        url: "https://www.englishclub.com/efl/survival/walk-in-clinic/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Survival English page for describing symptoms and asking basic clinic questions.",
        resourceFeatures: ["Audio", "Vocabulary", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: English for Nurses and Medical Professionals",
        url: "https://www.englishclub.com/english-for-work/medical.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Medical English index with body, symptom, and clinic vocabulary for feeling-sick topics.",
        resourceFeatures: ["Vocabulary", "Quiz", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Feelings, Opinions & Personality",
    topicTitle: "Giving Opinions",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Expressions for Agreeing and Disagreeing",
        url: "https://www.englishclub.com/speaking/agreeing-disagreeing-expressions.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Speaking reference with opinion, agreement, and disagreement phrase groups.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Primary"
      },
      {
        type: "PDF",
        title: "BBC Learning English: Being polite - giving opinions",
        url: "https://downloads.bbc.co.uk/learningenglish/eiam/unit-2/210430_EIAM_giving_opinions.pdf",
        source: "BBC Learning English",
        level: "A2-B1",
        notes: "Downloadable BBC worksheet/transcript-style resource for polite opinion language.",
        downloadable: true,
        resourceFeatures: ["PDF", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Plans, Events & Social Life",
    topicTitle: "Making Plans",
    resources: [
      {
        type: "External Website",
        title: "British Council LearnEnglish: English for emails Unit 5 - Making arrangements",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-5-making-arrangements",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Email arrangement resource that can be adapted for speaking about meeting times and plans.",
        resourceFeatures: ["Exercises", "Functional Language"],
        priority: "Secondary"
      },
      {
        type: "External Website",
        title: "EnglishClub: 200 Example Sentences",
        url: "https://www.englishclub.com/grammar/sentence/examples.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Sentence-bank page with appointment and invitation examples useful for controlled planning practice.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Picture Talk & Description",
    topicTitle: "Describing People",
    resources: [
      {
        type: "Vocabulary Notes",
        title: "British Council LearnEnglish: Appearance 1",
        url: "https://learnenglish.britishcouncil.org/free-resources/vocabulary/a1-a2/appearance-1",
        source: "British Council LearnEnglish",
        level: "A1-A2",
        notes: "Appearance vocabulary page for describing people in pictures.",
        resourceFeatures: ["Vocabulary", "Exercises"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "Cambridge English: What do they look like?",
        url: "https://www.cambridgeenglish.org/learning-english/activities-for-learners/a2p054-what-do-they-look-like",
        source: "Cambridge English",
        level: "A1-A2",
        notes: "Cambridge learner activity focused on matching descriptions of people to pictures.",
        resourceFeatures: ["Audio", "Interactive Quiz"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "speaking-topics",
    groupTitle: "Picture Talk & Description",
    topicTitle: "Telling a Story from a Picture",
    resources: [
      {
        type: "Article",
        title: "LearnEnglish Teens: Describe a photo or picture",
        url: "https://learnenglishteens.britishcouncil.org/exams/speaking-exams/describe-photo-or-picture",
        source: "British Council LearnEnglish Teens",
        level: "B1",
        notes: "Closely related photo-description resource with tips teachers can simplify for A1-A2 story prompts.",
        resourceFeatures: ["Video", "Worksheet", "Exercises"],
        priority: "Primary"
      },
      {
        type: "PDF",
        title: "Cambridge English: A2 Key picture story activity",
        url: "https://www.cambridgeenglish.org/Images/582039--online-teaching-a2-key-for-schools-reading-and-writing-part-7-picture-story.pdf",
        source: "Cambridge English",
        level: "A2",
        notes: "Official Cambridge teaching PDF for developing short picture-story tasks.",
        downloadable: true,
        resourceFeatures: ["PDF", "Teacher Notes"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Before the Trip",
    topicTitle: "Booking a Flight",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: English for Airline Staff",
        url: "https://www.englishclub.com/english-for-work/airline.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Airline English index with vocabulary, check-in language, and announcement practice.",
        resourceFeatures: ["Vocabulary", "Audio", "Quiz"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Airport English",
        url: "https://www.englishclub.com/efl/survival/airport-english/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Survival English page for common airport questions and passenger language before flying.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Airport & Flight",
    topicTitle: "Airport Check-in",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Checking In Passengers",
        url: "https://www.englishclub.com/english-for-work/airline-check-in.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Check-in desk language page with passenger questions and a short comprehension quiz.",
        resourceFeatures: ["Functional Language", "Quiz", "Vocabulary"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Airline Vocabulary",
        url: "https://www.englishclub.com/english-for-work/airline-vocabulary.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Airline vocabulary list covering boarding, baggage, gate, and flight terms.",
        resourceFeatures: ["Vocabulary", "Reference"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Airport & Flight",
    topicTitle: "Security Check",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Airport English",
        url: "https://www.englishclub.com/efl/survival/airport-english/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Airport survival page including common questions learners may hear around check-in and security.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Airline Vocabulary",
        url: "https://www.englishclub.com/english-for-work/airline-vocabulary.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Airline vocabulary reference that includes passport, security, and baggage-related terms.",
        resourceFeatures: ["Vocabulary", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Airport & Flight",
    topicTitle: "Airport Directions",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: How to Give Directions",
        url: "https://www.englishclub.com/efl/survival/how-to-give-directions/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Direction-giving survival page for airport terminal and gate direction role plays.",
        resourceFeatures: ["Audio", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "ESL Listening Website",
        title: "British Council LearnEnglish: Finding the library",
        url: "https://learnenglish.britishcouncil.org/skills/listening/a1-listening/finding-library",
        source: "British Council LearnEnglish",
        level: "A1",
        notes: "A simple directions listening page that can be mapped onto airport location practice.",
        resourceFeatures: ["Audio", "Transcript", "Exercises"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Immigration, Baggage & Customs",
    topicTitle: "Immigration Questions",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Checking In Passengers",
        url: "https://www.englishclub.com/english-for-work/airline-check-in.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Closely related passenger-question page with passport and travel-document language.",
        resourceFeatures: ["Functional Language", "Quiz"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Airline Vocabulary",
        url: "https://www.englishclub.com/english-for-work/airline-vocabulary.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Reference list for airport, passport, and international travel terms.",
        resourceFeatures: ["Vocabulary", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Immigration, Baggage & Customs",
    topicTitle: "Baggage Claim",
    resources: [
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Airline Vocabulary",
        url: "https://www.englishclub.com/english-for-work/airline-vocabulary.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Airline vocabulary page that includes baggage and luggage-claim language.",
        resourceFeatures: ["Vocabulary", "Reference"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Airport English",
        url: "https://www.englishclub.com/efl/survival/airport-english/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Airport survival page useful for baggage desk and arrival-area language support.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Hotel & Accommodation",
    topicTitle: "Hotel Check-in",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: English for Hotel Staff",
        url: "https://www.englishclub.com/english-for-work/hotel.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Hotel English index with reservations, check-in/out, vocabulary, audio, and quizzes.",
        resourceFeatures: ["Audio", "Vocabulary", "Quiz"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "British Council LearnEnglish: Hotels",
        url: "https://learnenglish.britishcouncil.org/free-resources/vocabulary/a1-a2/hotels",
        source: "British Council LearnEnglish",
        level: "A2",
        notes: "Hotel vocabulary page for room types, facilities, and simple check-in questions.",
        resourceFeatures: ["Vocabulary", "Exercises"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Transport & Directions",
    topicTitle: "Asking for Directions",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: How to Give Directions",
        url: "https://www.englishclub.com/efl/survival/how-to-give-directions/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Survival English page with short direction phrases and audio support.",
        resourceFeatures: ["Audio", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "British Council LearnEnglish: Places in a town 1",
        url: "https://learnenglish.britishcouncil.org/free-resources/vocabulary/a1-a2/places-town-1",
        source: "British Council LearnEnglish",
        level: "A1-A2",
        notes: "Town-place vocabulary page for map-based asking-directions practice.",
        resourceFeatures: ["Vocabulary", "Exercises"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Transport & Directions",
    topicTitle: "Taking a Taxi",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: English for Taxi Drivers",
        url: "https://www.englishclub.com/english-for-work/taxi-drivers.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Taxi English page with destination, route, payment, and clarification phrases.",
        resourceFeatures: ["Functional Language", "Vocabulary"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "British Council LearnEnglish: Transport 1",
        url: "https://learnenglish.britishcouncil.org/free-resources/vocabulary/a1-a2/transport-1",
        source: "British Council LearnEnglish",
        level: "A1-A2",
        notes: "Transport vocabulary page for taxi and city travel speaking preparation.",
        resourceFeatures: ["Vocabulary", "Exercises"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Food, Shopping & Emergency",
    topicTitle: "Ordering Food Abroad",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: English for Food and Beverage Staff",
        url: "https://www.englishclub.com/english-for-work/food-drink.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Hospitality English index with restaurant vocabulary and service-language support.",
        resourceFeatures: ["Vocabulary", "Quiz", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "ESL Listening Website",
        title: "British Council LearnEnglish: Ordering in a cafe",
        url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/ordering-cafe",
        source: "British Council LearnEnglish",
        level: "A1",
        notes: "Cafe-ordering listening page for food-and-drink requests while travelling.",
        resourceFeatures: ["Audio", "Transcript", "Exercises"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Food, Shopping & Emergency",
    topicTitle: "Buying Souvenirs",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: How to Shop in English",
        url: "https://www.englishclub.com/efl/survival/how-to-shop-in-english/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Shopping survival page for prices, payment, and simple shop questions.",
        resourceFeatures: ["Functional Language", "Vocabulary"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "British Council LearnEnglish: Shopping",
        url: "https://learnenglish.britishcouncil.org/free-resources/vocabulary/a1-a2/shopping",
        source: "British Council LearnEnglish",
        level: "A1-A2",
        notes: "Shopping vocabulary page that fits souvenir shop browsing and purchase practice.",
        resourceFeatures: ["Vocabulary", "Exercises"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "travel-english",
    groupTitle: "Food, Shopping & Emergency",
    topicTitle: "Lost Passport",
    resources: [
      {
        type: "External Website",
        title: "USAGov: Foreign visitors with lost or stolen passports",
        url: "https://www.usa.gov/lost-visa-passport",
        source: "USAGov",
        level: "A1-A2",
        notes: "Official plain-language reference for lost passport steps; useful as a realistic emergency link.",
        resourceFeatures: ["Reference", "Travel"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Helping Tourists - English for Police",
        url: "https://www.englishclub.com/english-for-work/police-tourists.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Police-tourist language page for reporting lost items and asking for help.",
        resourceFeatures: ["Functional Language", "Vocabulary"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Workplace Basics",
    topicTitle: "Professional Self-introduction",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: Greetings in Business",
        url: "https://www.englishclub.com/speaking/greetings-business.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Business greeting page with professional introduction language and audio practice.",
        resourceFeatures: ["Audio", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "ESL Listening Website",
        title: "British Council LearnEnglish: Business cards",
        url: "https://learnenglish.britishcouncil.org/skills/listening/a1-listening/business-cards",
        source: "British Council LearnEnglish",
        level: "A1-A2",
        notes: "Job-title and business-card listening page that supports short professional introductions.",
        resourceFeatures: ["Audio", "Transcript", "Exercises"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Email & Written Communication",
    topicTitle: "Writing a Polite Email",
    resources: [
      {
        type: "External Website",
        title: "British Council LearnEnglish: English for emails",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Structured business-email course index with interactive lessons for email tone and organization.",
        resourceFeatures: ["Exercises", "Email", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: What Your Students Need To Know About Emailing",
        url: "https://www.englishclub.com/efl/tefl/skills/emailing/",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Teacher-facing article on email formality, tone, openings, closings, and typical functions.",
        resourceFeatures: ["Teacher Notes", "Email", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Email & Written Communication",
    topicTitle: "Request Emails",
    resources: [
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 6 - Enquiries",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-6-enquiries",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Interactive email unit focused on asking questions and making enquiries politely.",
        resourceFeatures: ["Exercises", "Email", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Planning a Business Letter",
        url: "https://www.englishclub.com/business-english/business-letters-plan.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Business writing page that helps teachers frame clear requests and required responses.",
        resourceFeatures: ["Reference", "Email"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Email & Written Communication",
    topicTitle: "Follow-up Emails",
    resources: [
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 5 - Making arrangements",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-5-making-arrangements",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Arrangement email unit useful for follow-ups about dates, times, and next steps.",
        resourceFeatures: ["Exercises", "Email", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Proofreading a Business Letter",
        url: "https://www.englishclub.com/business-english/business-letters-proofread.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Business writing checklist that fits final checks before sending follow-up emails.",
        resourceFeatures: ["Checklist", "Email", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Meetings & Discussions",
    topicTitle: "Starting a Meeting",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: Meetings",
        url: "https://www.englishclub.com/business-english/meetings.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Meetings index with opening, agenda, vocabulary, and comprehension sections.",
        resourceFeatures: ["Vocabulary", "Functional Language", "Quiz"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "EnglishClub: Greetings in Business",
        url: "https://www.englishclub.com/speaking/greetings-business.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Professional greeting resource for warm openings and polite first turns in meetings.",
        resourceFeatures: ["Audio", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Meetings & Discussions",
    topicTitle: "Giving Opinions in a Meeting",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Expressions for Agreeing and Disagreeing",
        url: "https://www.englishclub.com/speaking/agreeing-disagreeing-expressions.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Functional phrase reference for stating opinions and responding to colleagues.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Primary"
      },
      {
        type: "PDF",
        title: "BBC Learning English: Being polite - giving opinions",
        url: "https://downloads.bbc.co.uk/learningenglish/eiam/unit-2/210430_EIAM_giving_opinions.pdf",
        source: "BBC Learning English",
        level: "A2-B1",
        notes: "BBC PDF resource for soft, polite ways to express opinions in workplace discussions.",
        downloadable: true,
        resourceFeatures: ["PDF", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Phone, Online Meetings & Scheduling",
    topicTitle: "Scheduling a Meeting",
    resources: [
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 5 - Making arrangements",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-5-making-arrangements",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Business email unit for arranging dates, times, and availability.",
        resourceFeatures: ["Exercises", "Email", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Meetings",
        url: "https://www.englishclub.com/business-english/meetings.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Meeting skills index that gives context for scheduling and agenda preparation.",
        resourceFeatures: ["Vocabulary", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Phone, Online Meetings & Scheduling",
    topicTitle: "Business Phone Calls",
    resources: [
      {
        type: "ESL Listening Website",
        title: "Business English Pod: Opening Calls and Taking Messages",
        url: "https://www.businessenglishpod.com/2006/11/08/bep-21-telephoning-opening-calls-and-taking-messages/comment-page-1/",
        source: "Business English Pod",
        level: "A2-B1",
        notes: "Business phone lesson page covering opening calls, stating purpose, and taking messages.",
        resourceFeatures: ["Audio", "Transcript", "Podcast"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Telephone Tips",
        url: "https://www.englishclub.com/speaking/telephone-tips.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Telephone English advice page with practical communication and clarity strategies.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Professional Communication Skills",
    topicTitle: "Asking for Clarification",
    resources: [
      {
        type: "ESL Listening Website",
        title: "Business English Pod: Meetings - Clarifying Meaning",
        url: "https://www.businessenglishpod.com/2007/02/24/bep-35-int-meetings-clarifying-meaning/",
        source: "Business English Pod",
        level: "A2-B1",
        notes: "Meeting-focused lesson on asking what someone means and checking understanding.",
        resourceFeatures: ["Audio", "Transcript", "Podcast"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Telephone Tips",
        url: "https://www.englishclub.com/speaking/telephone-tips.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Includes practical advice on asking speakers to repeat, slow down, and confirm details.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Professional Communication Skills",
    topicTitle: "Softening Direct Language",
    resources: [
      {
        type: "PDF",
        title: "BBC Learning English: Being polite",
        url: "https://downloads.bbc.co.uk/learningenglish/towardsadvanced/unit_24/bbc_masterclass_24_being_polite.pdf",
        source: "BBC Learning English",
        level: "B1",
        notes: "BBC PDF on softening language for more polite communication; useful for higher A2-B1 classes.",
        downloadable: true,
        resourceFeatures: ["PDF", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 9 - Email etiquette",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-9-email-etiquette",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Business email etiquette unit for identifying direct, rude, and more polite wording.",
        resourceFeatures: ["Exercises", "Email", "Functional Language"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "HR, Job Search & Office Culture",
    topicTitle: "Job Interview Self-introduction",
    resources: [
      {
        type: "External Website",
        title: "British Council LearnEnglish: You're Hired",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/youre-hired",
        source: "British Council LearnEnglish",
        level: "B1",
        notes: "Interview and recruitment video series teachers can mine for job-interview speaking practice.",
        resourceFeatures: ["Video", "Transcript", "Exercises"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "EnglishClub: Resumes and Cover Letters",
        url: "https://www.englishclub.com/business-english/resumes.php",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Job application index that supports interview self-introduction preparation.",
        resourceFeatures: ["Reference", "Vocabulary"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "business-english",
    groupTitle: "Management, Problems & Feedback",
    topicTitle: "Giving Feedback",
    resources: [
      {
        type: "ESL Listening Website",
        title: "Business English Pod: Performance Appraisals - Giving Feedback",
        url: "https://www.businessenglishpod.com/2007/12/02/bep-75-adv-performance-appraisals-giving-feedback-part-1/",
        source: "Business English Pod",
        level: "B1",
        notes: "Feedback-focused business podcast lesson for performance review and workplace comment language.",
        resourceFeatures: ["Audio", "Transcript", "Podcast"],
        priority: "Primary"
      },
      {
        type: "ESL Listening Website",
        title: "Business English Pod: Giving and Receiving Feedback",
        url: "https://www.businessenglishpod.com/2013/06/09/skills-360-giving-and-receiving-feedback-part-1/",
        source: "Business English Pod",
        level: "B1",
        notes: "Skills 360 lesson page with a practical overview of workplace feedback communication.",
        resourceFeatures: ["Audio", "Transcript", "Podcast"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Company, Product & Market",
    topicTitle: "Introducing Your Company",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: What is Business English?",
        url: "https://www.englishclub.com/business-english/what.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Business English overview that helps frame company-introduction and trade-context language.",
        resourceFeatures: ["Reference", "Business Vocabulary"],
        priority: "Secondary"
      },
      {
        type: "External Website",
        title: "EnglishClub: Business English",
        url: "https://www.englishclub.com/business-english/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Business English index with correspondence, meetings, negotiation, and vocabulary sections.",
        resourceFeatures: ["Reference", "Vocabulary"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Company, Product & Market",
    topicTitle: "Introducing Your Product",
    resources: [
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Import-Export Vocabulary",
        url: "https://www.englishclub.com/vocabulary/20_import-export.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Import-export vocabulary reference for describing products, shipments, and trade documents.",
        resourceFeatures: ["Vocabulary", "Reference"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Business Presentations",
        url: "https://www.englishclub.com/speaking/presentations.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Closely related presentation index useful for structuring short product-introduction talks.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Inquiry & Customer Development",
    topicTitle: "Replying to an Inquiry",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Sample Letter Sending Information",
        url: "https://www.englishclub.com/business-english/correspondence-information-sending.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Sample business letter responding to a request for information and enclosing details.",
        resourceFeatures: ["Email", "Reference"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 6 - Enquiries",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-6-enquiries",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Enquiry email unit that supports both asking and responding to customer questions.",
        resourceFeatures: ["Exercises", "Email"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Inquiry & Customer Development",
    topicTitle: "Asking Customer Needs",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Planning a Business Letter",
        url: "https://www.englishclub.com/business-english/business-letters-plan.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Business writing guide for identifying audience, purpose, details, and requested response.",
        resourceFeatures: ["Email", "Checklist", "Reference"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 6 - Enquiries",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-6-enquiries",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Question-focused email lesson for politely asking about requirements and needs.",
        resourceFeatures: ["Exercises", "Email", "Functional Language"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Quotation, Price & Negotiation",
    topicTitle: "Sending a Quotation",
    resources: [
      {
        type: "External Website",
        title: "International Trade Administration: Know Your Incoterms",
        url: "https://www.trade.gov/index.php/know-your-incoterms",
        source: "International Trade Administration",
        level: "A1-A2",
        notes: "Official trade reference for Incoterms often used in export quotations.",
        resourceFeatures: ["Reference", "Trade Terms"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Sample Letter Sending Information",
        url: "https://www.englishclub.com/business-english/correspondence-information-sending.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Sample correspondence page that includes sending brochures and price-list information.",
        resourceFeatures: ["Email", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Quotation, Price & Negotiation",
    topicTitle: "Price Negotiation",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: Negotiation",
        url: "https://www.englishclub.com/business-english/negotiations.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Negotiation lesson index with vocabulary, preparation, process, and settlement resources.",
        resourceFeatures: ["Vocabulary", "Quiz", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Negotiation Vocabulary",
        url: "https://www.englishclub.com/business-english/negotiations-vocabulary.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Negotiation vocabulary list for price, concession, compromise, and settlement language.",
        resourceFeatures: ["Vocabulary", "Reference"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Samples, MOQ & Customization",
    topicTitle: "Sample Request",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Sample Business Letters",
        url: "https://www.englishclub.com/business-english/correspondence-samples.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Sample correspondence index with request and information letter models teachers can adapt.",
        resourceFeatures: ["Email", "Reference"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 6 - Enquiries",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-6-enquiries",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Enquiry lesson useful for requesting samples and asking follow-up product questions.",
        resourceFeatures: ["Exercises", "Email"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Samples, MOQ & Customization",
    topicTitle: "MOQ Explanation",
    resources: [
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Import-Export Vocabulary",
        url: "https://www.englishclub.com/vocabulary/20_import-export.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Trade vocabulary page for explaining order quantity, shipment, and document terms.",
        resourceFeatures: ["Vocabulary", "Reference"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Planning a Business Letter",
        url: "https://www.englishclub.com/business-english/business-letters-plan.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "General business-writing planning page for making MOQ explanations clear and concise.",
        resourceFeatures: ["Email", "Checklist"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Orders, Payment & Contracts",
    topicTitle: "Payment Terms",
    resources: [
      {
        type: "External Website",
        title: "International Trade Administration: Methods of Payment",
        url: "https://www.trade.gov/index.php/methods-payment",
        source: "International Trade Administration",
        level: "A1-A2",
        notes: "Official export reference explaining international payment methods and risk.",
        resourceFeatures: ["Reference", "Trade Terms"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Sample Request for Payment Letter",
        url: "https://www.englishclub.com/business-english/correspondence-payment-request.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Business correspondence example for payment-related wording and reminders.",
        resourceFeatures: ["Email", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Orders, Payment & Contracts",
    topicTitle: "Order Confirmation",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Business Letters - Writing",
        url: "https://www.englishclub.com/business-english/business-letters-write.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Business writing guide for clear, short confirmation emails and letters.",
        resourceFeatures: ["Email", "Functional Language", "Reference"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Sample Letter Sending Information",
        url: "https://www.englishclub.com/business-english/correspondence-information-sending.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Closely related correspondence model for confirming and sending requested business details.",
        resourceFeatures: ["Email", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "Shipping, Documents & Customs",
    topicTitle: "Shipping Method",
    resources: [
      {
        type: "External Website",
        title: "International Trade Administration: Know Your Incoterms",
        url: "https://www.trade.gov/index.php/know-your-incoterms",
        source: "International Trade Administration",
        level: "A1-A2",
        notes: "Official reference for shipping responsibilities, costs, risk, and trade terms.",
        resourceFeatures: ["Reference", "Trade Terms"],
        priority: "Primary"
      },
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Import-Export Vocabulary",
        url: "https://www.englishclub.com/vocabulary/20_import-export.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Import-export vocabulary list covering freight, shipment, bill of lading, and waybill.",
        resourceFeatures: ["Vocabulary", "Reference"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "foreign-trade-english",
    groupTitle: "After-sales, Claims & Relationship Maintenance",
    topicTitle: "Handling Customer Complaints",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Business Letters - Writing",
        url: "https://www.englishclub.com/business-english/business-letters-write.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Business writing page that includes tactful language for unpleasant facts and customer issues.",
        resourceFeatures: ["Email", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 9 - Email etiquette",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-9-email-etiquette",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Email etiquette unit for avoiding rude wording in complaint and after-sales replies.",
        resourceFeatures: ["Exercises", "Email", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Conversation Management",
    topicTitle: "Starting a Conversation",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: Greetings in English",
        url: "https://www.englishclub.com/speaking/greetings.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Greeting index with audio-linked pages for classroom, business, party, and home contexts.",
        resourceFeatures: ["Audio", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Greetings in Passing",
        url: "https://www.englishclub.com/speaking/greetings-passing.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Short greeting page for quick starts to casual conversations.",
        resourceFeatures: ["Audio", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Conversation Management",
    topicTitle: "Keeping a Conversation Going",
    resources: [
      {
        type: "Article",
        title: "LearnEnglish Teens: Showing interest",
        url: "https://learnenglishteens.britishcouncil.org/exams/speaking-exams/showing-interest",
        source: "British Council LearnEnglish Teens",
        level: "A2-B1",
        notes: "Speaking exam page for showing interest and encouraging another speaker.",
        resourceFeatures: ["Video", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Speaking Skills Guide",
        url: "https://www.englishclub.com/speaking/guide.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Speaking guide with conversation, small talk, and functional-language pointers.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Conversation Management",
    topicTitle: "Buying Time",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: Conversational Phrases A",
        url: "https://www.englishclub.com/ref/Conversational_Phrases/A/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Conversational phrase reference that teachers can search for fillers and response phrases.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      },
      {
        type: "Article",
        title: "EnglishClub: Speaking Skills Guide",
        url: "https://www.englishclub.com/speaking/guide.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "General speaking guide for listening first, responding naturally, and managing turns.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Reactions & Emotions",
    topicTitle: "Reacting to Good News",
    resources: [
      {
        type: "External Website",
        title: "EnglishClub: 200 Example Sentences",
        url: "https://www.englishclub.com/grammar/sentence/examples.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Sentence-bank resource with simple reaction patterns teachers can adapt for good-news responses.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      },
      {
        type: "External Website",
        title: "EnglishClub: Conversational Phrases A",
        url: "https://www.englishclub.com/ref/Conversational_Phrases/A/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Phrase reference for natural short responses and conversational reactions.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Reactions & Emotions",
    topicTitle: "Reacting to Bad News",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: How to Express Condolences",
        url: "https://www.englishclub.com/efl/survival/condolences/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Survival English page for responding carefully to serious bad news.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "EnglishClub: 200 Example Sentences",
        url: "https://www.englishclub.com/grammar/sentence/examples.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Simple sentence-bank page with apology and sympathy-related patterns for low-level support.",
        resourceFeatures: ["Reference", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Opinions & Discussion",
    topicTitle: "Giving Opinions Naturally",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: Expressions for Agreeing and Disagreeing",
        url: "https://www.englishclub.com/speaking/agreeing-disagreeing-expressions.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Functional phrase page with opinion starters and discussion responses.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Primary"
      },
      {
        type: "PDF",
        title: "BBC Learning English: Being polite - giving opinions",
        url: "https://downloads.bbc.co.uk/learningenglish/eiam/unit-2/210430_EIAM_giving_opinions.pdf",
        source: "BBC Learning English",
        level: "A2-B1",
        notes: "BBC downloadable PDF focused on polite ways to give opinions.",
        downloadable: true,
        resourceFeatures: ["PDF", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Opinions & Discussion",
    topicTitle: "Agreeing Naturally",
    resources: [
      {
        type: "Vocabulary Notes",
        title: "EnglishClub: Agreeing",
        url: "https://www.englishclub.com/vocabulary/fl-agreeing.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Functional language list of agreement expressions organized by level.",
        resourceFeatures: ["Functional Language", "Vocabulary"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Expressions for Agreeing and Disagreeing",
        url: "https://www.englishclub.com/speaking/agreeing-disagreeing-expressions.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Broader discussion phrase page for stronger and softer agreement responses.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Opinions & Discussion",
    topicTitle: "Disagreeing Softly",
    resources: [
      {
        type: "Article",
        title: "EnglishClub: How to Disagree in English",
        url: "https://www.englishclub.com/efl/articles/everyday-english/how-to-disagree-in-english/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Article focused on soft and polite ways to disagree.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: Expressions for Agreeing and Disagreeing",
        url: "https://www.englishclub.com/speaking/agreeing-disagreeing-expressions.php",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Phrase reference with common soft disagreement options for discussion classes.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Primary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Suggestions, Requests & Refusals",
    topicTitle: "Making Suggestions",
    resources: [
      {
        type: "PDF",
        title: "BBC Learning English: How to suggest",
        url: "https://downloads.bbc.co.uk/worldservice/learningenglish/howto/suggesting.pdf",
        source: "BBC Learning English",
        level: "A2-B1",
        notes: "BBC PDF resource for suggestion language and short discussion examples.",
        downloadable: true,
        resourceFeatures: ["PDF", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "PDF",
        title: "BBC Learning English: Office English - suggestions and advice",
        url: "https://downloads.bbc.co.uk/learningenglish/office_english/260413_OfficeEnglish_suggestions_and_advice_transcript.pdf",
        source: "BBC Learning English",
        level: "A2-B1",
        notes: "Office English transcript PDF focused on making suggestions and giving advice.",
        downloadable: true,
        resourceFeatures: ["PDF", "Transcript", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Suggestions, Requests & Refusals",
    topicTitle: "Rejecting Suggestions Politely",
    resources: [
      {
        type: "PDF",
        title: "BBC Learning English: How to suggest",
        url: "https://downloads.bbc.co.uk/worldservice/learningenglish/howto/suggesting.pdf",
        source: "BBC Learning English",
        level: "A2-B1",
        notes: "Suggestion-language PDF that teachers can use for accepting and rejecting suggestion practice.",
        downloadable: true,
        resourceFeatures: ["PDF", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: How to Disagree in English",
        url: "https://www.englishclub.com/efl/articles/everyday-english/how-to-disagree-in-english/",
        source: "EnglishClub",
        level: "A1-A2",
        notes: "Closely related soft-disagreement article for polite rejection phrasing.",
        resourceFeatures: ["Functional Language", "Reference"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Politeness & Softening",
    topicTitle: "Sounding More Polite",
    resources: [
      {
        type: "PDF",
        title: "BBC Learning English: Being polite",
        url: "https://downloads.bbc.co.uk/learningenglish/towardsadvanced/unit_24/bbc_masterclass_24_being_polite.pdf",
        source: "BBC Learning English",
        level: "B1",
        notes: "BBC PDF on softening language to sound more polite; useful as an extension resource.",
        downloadable: true,
        resourceFeatures: ["PDF", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 9 - Email etiquette",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-9-email-etiquette",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Email etiquette unit for identifying impolite wording and choosing softer alternatives.",
        resourceFeatures: ["Exercises", "Email", "Functional Language"],
        priority: "Secondary"
      }
    ]
  },
  {
    categorySlug: "native-phrases",
    groupTitle: "Politeness & Softening",
    topicTitle: "Polite Follow-ups",
    resources: [
      {
        type: "External Website",
        title: "British Council LearnEnglish: Unit 4 - Starting and finishing emails",
        url: "https://learnenglish.britishcouncil.org/free-resources/business/english-emails/unit-4-starting-finishing-emails",
        source: "British Council LearnEnglish",
        level: "A2-B1",
        notes: "Email unit with openings and closings that support polite follow-up messages.",
        resourceFeatures: ["Exercises", "Email", "Functional Language"],
        priority: "Primary"
      },
      {
        type: "Article",
        title: "EnglishClub: What Your Students Need To Know About Emailing",
        url: "https://www.englishclub.com/efl/tefl/skills/emailing/",
        source: "EnglishClub",
        level: "A2-B1",
        notes: "Teacher-facing article on email formality and follow-up tone choices.",
        resourceFeatures: ["Teacher Notes", "Email", "Reference"],
        priority: "Secondary"
      }
    ]
  }
];

const curatedExternalResources = curatedResourceBatches.flatMap((batch) =>
  batch.resources.map((item) =>
    resource(topicId(batch.categorySlug, batch.groupTitle, batch.topicTitle), {
      isLocal: false,
      ...item
    })
  )
);

const selectedCuratedTopicIds = new Set(
  curatedResourceBatches.map((batch) => topicId(batch.categorySlug, batch.groupTitle, batch.topicTitle))
);

const resources = [
  resource(topicId("speaking-topics", "Personal Life & Identity", "Self-introduction"), {
    type: "Worksheet",
    title: "Self-introduction Starter Worksheet",
    url: "/resources/speaking/self-introduction-starter-worksheet.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Printable worksheet placeholder for basic introduction prompts.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Printable", "Teacher Notes"]
  }),
  resource(topicId("speaking-topics", "Personal Life & Identity", "Self-introduction"), {
    type: "YouTube Supplement",
    title: "Self Introduction ESL Video Search",
    url: "https://www.youtube.com/results?search_query=ESL+self+introduction+beginner",
    source: "YouTube Search",
    level: "A1-A2",
    notes: "Supplementary search link for teacher-selected beginner self-introduction videos.",
    isLocal: false,
    priority: "Supplement",
    resourceFeatures: ["Video"]
  }),
  resource(topicId("speaking-topics", "Personal Life & Identity", "Self-introduction"), {
    type: "Word",
    title: "First Class Self-introduction Planning Notes",
    url: "/resources/speaking/self-introduction-first-class-plan.docx",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Editable document placeholder for short teacher planning notes.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Editable", "Teacher Notes"]
  }),
  resource(topicId("speaking-topics", "Food, Drinks & Restaurants", "Ordering in a Restaurant"), {
    type: "PPT",
    title: "Restaurant Ordering Slide Set",
    url: "/resources/speaking/ordering-in-a-restaurant-slides.pptx",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Slide placeholder for menu language, ordering stages, and service roles.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Slides", "Role-play"]
  }),
  resource(topicId("speaking-topics", "Food, Drinks & Restaurants", "Ordering in a Restaurant"), {
    type: "ESL Listening Website",
    title: "Restaurant English Resource Search",
    url: "https://learnenglish.britishcouncil.org/search?keyword=restaurant",
    source: "British Council Search",
    level: "A1-A2",
    notes: "External search page for restaurant-related listening and vocabulary resources.",
    isLocal: false,
    priority: "Primary",
    resourceFeatures: ["Audio", "Exercises"]
  }),
  resource(topicId("speaking-topics", "Food, Drinks & Restaurants", "Ordering in a Restaurant"), {
    type: "Audio File",
    title: "Restaurant Ordering Audio Placeholder",
    url: "/resources/audio/restaurant-ordering-audio.mp3",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Audio file placeholder for teacher-created ordering practice.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Audio"]
  }),
  resource(topicId("travel-english", "Airport & Flight", "Airport Check-in"), {
    type: "PDF",
    title: "Airport Check-in Phrase Sheet",
    url: "/resources/travel/airport-check-in-phrase-sheet.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "One-page printable reference placeholder for check-in desk language.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Printable"]
  }),
  resource(topicId("travel-english", "Airport & Flight", "Airport Check-in"), {
    type: "Transcript",
    title: "Airport Check-in Listening Transcript",
    url: "/resources/travel/airport-check-in-transcript.docx",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Editable transcript placeholder for a short airport check-in listening task.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Transcript", "Editable"]
  }),
  resource(topicId("travel-english", "Airport & Flight", "Airport Check-in"), {
    type: "YouTube Supplement",
    title: "Airport Check-in ESL Video Search",
    url: "https://www.youtube.com/results?search_query=airport+check+in+english+conversation",
    source: "YouTube Search",
    level: "A1-A2",
    notes: "Supplementary search link for teacher-reviewed airport check-in videos.",
    isLocal: false,
    priority: "Supplement",
    resourceFeatures: ["Video"]
  }),
  resource(topicId("business-english", "Email & Written Communication", "Writing a Polite Email"), {
    type: "Word",
    title: "Polite Email Template Pack",
    url: "/resources/business/polite-email-template-pack.docx",
    source: "Local Placeholder",
    level: "A2-B1",
    notes: "Editable template placeholder for request, reply, follow-up, and reminder emails.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Editable", "Templates"]
  }),
  resource(topicId("business-english", "Email & Written Communication", "Writing a Polite Email"), {
    type: "Article",
    title: "Business Email Writing Reference",
    url: "https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/basic_business_letters/index.html",
    source: "Purdue OWL",
    level: "A2-B1",
    notes: "External reference for formal professional writing conventions.",
    isLocal: false,
    priority: "Supplement",
    resourceFeatures: ["Reference"]
  }),
  resource(topicId("business-english", "Email & Written Communication", "Writing a Polite Email"), {
    type: "Interactive Quiz",
    title: "Email Tone Sorting Quiz",
    url: "/resources/business/email-tone-sorting-quiz.pdf",
    source: "Local Placeholder",
    level: "A2-B1",
    notes: "Printable quiz placeholder for identifying formal, polite, and direct email tones.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Quiz", "Answer Key"]
  }),
  resource(topicId("foreign-trade-english", "Quotation, Price & Negotiation", "Sending a Quotation"), {
    type: "PPT",
    title: "Quotation Email Structure Slides",
    url: "/resources/foreign-trade/sending-a-quotation-slides.pptx",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Slide placeholder for quotation structure, price terms, and attachment references.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Slides", "Email"]
  }),
  resource(topicId("foreign-trade-english", "Quotation, Price & Negotiation", "Sending a Quotation"), {
    type: "External Website",
    title: "Incoterms Overview",
    url: "https://iccwbo.org/business-solutions/incoterms-rules/",
    source: "ICC",
    level: "A1-A2",
    notes: "External reference page for shipping terms that often appear in quotations.",
    isLocal: false,
    priority: "Supplement",
    resourceFeatures: ["Reference"]
  }),
  resource(topicId("foreign-trade-english", "Quotation, Price & Negotiation", "Sending a Quotation"), {
    type: "Worksheet",
    title: "Quotation Details Checklist",
    url: "/resources/foreign-trade/quotation-details-checklist.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Checklist placeholder for price, quantity, validity, payment, and delivery details.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Printable", "Checklist"]
  }),
  resource(topicId("native-phrases", "Politeness & Softening", "Sounding More Polite"), {
    type: "PDF",
    title: "Politeness Phrase Index",
    url: "/resources/native-phrases/politeness-phrase-index.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Reference placeholder for grouping softening phrases by classroom use case.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Reference", "Printable"]
  }),
  resource(topicId("native-phrases", "Politeness & Softening", "Sounding More Polite"), {
    type: "YouTube Supplement",
    title: "Polite English Phrase Video Search",
    url: "https://www.youtube.com/results?search_query=polite+english+phrases+ESL",
    source: "YouTube Search",
    level: "A1-A2",
    notes: "Supplementary search link for teacher-selected videos on polite English phrasing.",
    isLocal: false,
    priority: "Supplement",
    resourceFeatures: ["Video"]
  }),
  resource(topicId("native-phrases", "Politeness & Softening", "Sounding More Polite"), {
    type: "Worksheet",
    title: "Polite vs Direct Sorting Cards",
    url: "/resources/native-phrases/polite-vs-direct-sorting-cards.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Printable sorting-card placeholder for polite and direct wording comparisons.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Printable", "Cards"]
  }),
  resource(topicId("teacher-toolkit", "PPT Prompts", "PPT Prompts"), {
    type: "PPT",
    title: "Blank ESL Topic PPT Prompt Deck",
    url: "/resources/toolkit/blank-esl-topic-prompt-deck.pptx",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Reusable slide deck placeholder for topic prompts and class warm-ups.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Slides", "Templates"]
  }),
  resource(topicId("teacher-toolkit", "PPT Prompts", "PPT Prompts"), {
    type: "Word",
    title: "PPT Prompt Writing Checklist",
    url: "/resources/toolkit/ppt-prompt-writing-checklist.docx",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Editable checklist placeholder for preparing teacher-facing slide prompts.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Editable", "Checklist"]
  }),
  resource(topicId("teacher-toolkit", "PPT Prompts", "PPT Prompts"), {
    type: "External Website",
    title: "Canva Presentation Template Search",
    url: "https://www.canva.com/templates/s/presentation/",
    source: "Canva",
    level: "A1-A2",
    notes: "External search page for presentation templates teachers can adapt.",
    isLocal: false,
    priority: "Supplement",
    resourceFeatures: ["Templates"]
  }),
  ...curatedExternalResources,
  resource(topicId("listening-courses", "Daily Life Listening", "Self-introduction Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: Meeting other students",
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-other-students",
    source: "British Council LearnEnglish",
    level: "A1",
    notes: "Primary beginner listening page with audio, transcript support, and exercises.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Self-introduction Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Introductions",
    url: "https://www.esl-lab.com/basic-english/introductions/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Basic introduction listening page with audio, quiz support, and a script section.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Script"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Self-introduction Listening"), {
    type: "ESL Listening Website",
    title: "ELLLO main listening library",
    url: "https://elllo.org/",
    source: "ELLLO",
    level: "A1-A2",
    notes: "Large ESL listening library for finding additional short introduction and personal-information listening texts.",
    isLocal: false,
    priority: "Primary",
    resourceFeatures: ["Audio", "Video", "Transcript", "Vocabulary", "Interactive Quiz"]
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Self-introduction Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: Meeting people at a dinner",
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-people-dinner",
    source: "British Council LearnEnglish",
    level: "A1",
    notes: "Introductory social-listening page with audio, transcript, and comprehension tasks.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Daily Routine Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Daily Schedule",
    url: "https://www.esl-lab.com/easy/daily-schedule/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Daily schedule listening activity with audio, quiz, script, and vocabulary support.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Transcript", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Daily Routine Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: School Schedule",
    url: "https://www.esl-lab.com/basic-english/school-schedule/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Basic daily schedule listening page for school, transport, and evening routine details.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Script"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Daily Routine Listening"), {
    type: "ESL Listening Website",
    title: "LearnEnglish Teens: Study tips",
    url: "https://learnenglishteens.britishcouncil.org/skills/listening/a1-listening/study-tips",
    source: "British Council LearnEnglish Teens",
    level: "A1",
    notes: "A1 listening page with audio, transcript, exercises, and vocabulary checks around study habits.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Restaurant Conversation Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: Ordering in a cafe",
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/ordering-cafe",
    source: "British Council LearnEnglish",
    level: "A1",
    notes: "Primary cafe-ordering listening page with audio, transcript support, and exercises.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Restaurant Conversation Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: Booking a table",
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/booking-table",
    source: "British Council LearnEnglish",
    level: "A1",
    notes: "Restaurant booking listening page with audio, transcript, and comprehension exercises.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Restaurant Conversation Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Restaurants",
    url: "https://www.esl-lab.com/basic-english/restaurants/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Primary restaurant listening page with pre-listening support, audio, quiz, and script.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Script"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Restaurant Conversation Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Restaurant Order",
    url: "https://www.esl-lab.com/easy/restaurant-order/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Easy restaurant-order listening page with audio, quiz, script, and vocabulary support.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Transcript", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Shopping Conversation Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: Shopping for clothes",
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/shopping-clothes",
    source: "British Council LearnEnglish",
    level: "A1",
    notes: "Shop conversation listening page with audio, transcript, and comprehension tasks.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Shopping Conversation Listening"), {
    type: "ESL Listening Website",
    title: "LearnEnglish Teens: Shopping for clothes",
    url: "https://learnenglishteens.britishcouncil.org/skills/listening/a2-listening/shopping-clothes",
    source: "British Council LearnEnglish Teens",
    level: "A2",
    notes: "Clothes-shopping listening page with audio, transcript, exercises, and downloadable worksheets on the source page.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises", "Worksheet"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Shopping Conversation Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Shopping and Prices",
    url: "https://www.esl-lab.com/basic-english/shopping-and-prices/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Basic listening page for understanding prices, money, audio prompts, and quiz answers.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Script"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Shopping Conversation Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Clothing Styles",
    url: "https://www.esl-lab.com/easy/clothing-styles/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Shopping-adjacent clothing listening page with audio, quiz, transcript, and vocabulary practice.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Transcript", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Weather Conversation Listening"), {
    type: "ESL Listening Website",
    title: "LearnEnglish Teens: Weather forecast",
    url: "https://learnenglishteens.britishcouncil.org/skills/listening/a2-listening/weather-forecast",
    source: "British Council LearnEnglish Teens",
    level: "A2",
    notes: "Weather forecast listening page with audio, transcript, exercises, and worksheet links on the source page.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises", "Worksheet"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Weather Conversation Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: A weather forecast",
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/b1/weather-forecast",
    source: "British Council LearnEnglish",
    level: "B1",
    notes: "Weather forecast listening page with audio, transcript, and comprehension tasks for stronger A2 learners.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises", "Worksheet"],
    priority: "Secondary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Weather Conversation Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Friday's Weather Forecast",
    url: "https://www.esl-lab.com/academic-english/weather-report/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A2-B1",
    notes: "Weather report listening page with audio, quiz, transcript, and vocabulary support.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Transcript", "Vocabulary"],
    priority: "Secondary"
  }),
  resource(topicId("listening-courses", "Travel Listening", "Airport Announcement Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Airport Announcement",
    url: "https://www.esl-lab.com/academic-english/airport-announcement/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "B1",
    notes: "Airport-announcement listening page with audio, quiz, script access, and airport vocabulary support.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Script", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Travel Listening", "Airport Announcement Listening"), {
    type: "Script",
    title: "Randall's ESL Cyber Listening Lab: Airport Announcement Script",
    url: "https://www.esl-lab.com/academic-english/airport-announcement-script/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "B1",
    notes: "Script page for the airport announcement audio, useful for transcript checking after listening.",
    isLocal: false,
    resourceFeatures: ["Audio", "Script"],
    priority: "Secondary"
  }),
  resource(topicId("listening-courses", "Travel Listening", "Airport Announcement Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Airplane Trips",
    url: "https://www.esl-lab.com/basic-english/airplane-trips/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Basic airplane-travel listening page with audio prompts and quiz practice.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Script"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Travel Listening", "Airport Announcement Listening"), {
    type: "Vocabulary Notes",
    title: "Randall's ESL Cyber Listening Lab: Airplane Travel Vocabulary",
    url: "https://www.esl-lab.com/vocabulary-lessons/airplane-travel/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "External vocabulary listening page for airport and airplane terms with audio and quiz practice.",
    isLocal: false,
    resourceFeatures: ["Audio", "Vocabulary", "Quiz"],
    priority: "Secondary"
  }),
  resource(topicId("listening-courses", "Travel Listening", "Hotel Check-in Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Hotel Reservations",
    url: "https://www.esl-lab.com/easy/hotel-reservations/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Hotel reservation listening page with audio, quiz, transcript access, and vocabulary support.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Transcript", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Travel Listening", "Hotel Check-in Listening"), {
    type: "Script",
    title: "Randall's ESL Cyber Listening Lab: Hotel Reservation Script",
    url: "https://www.esl-lab.com/easy/hotel-reservations-script/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Script page for checking the hotel reservation conversation after listening.",
    isLocal: false,
    resourceFeatures: ["Audio", "Script"],
    priority: "Secondary"
  }),
  resource(topicId("listening-courses", "Travel Listening", "Hotel Check-in Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Hotel Room Service",
    url: "https://www.esl-lab.com/easy/hotel-room-service/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Hotel service listening page with audio, quiz, script access, and hotel-service vocabulary.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Transcript", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Travel Listening", "Hotel Check-in Listening"), {
    type: "Vocabulary Notes",
    title: "Randall's ESL Cyber Listening Lab: Hotel Rooms Vocabulary",
    url: "https://www.esl-lab.com/vocabulary-lessons/hotel-rooms/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "External hotel vocabulary listening page with audio and quiz practice for check-in language.",
    isLocal: false,
    resourceFeatures: ["Audio", "Vocabulary", "Quiz"],
    priority: "Secondary"
  }),
  resource(topicId("listening-courses", "Test-style Listening", "Number and Time Listening"), {
    type: "ESL Listening Website",
    title: "LearnEnglish Teens: Understanding numbers",
    url: "https://learnenglishteens.britishcouncil.org/skills/listening/a1-listening/understanding-numbers",
    source: "British Council LearnEnglish Teens",
    level: "A1",
    notes: "Primary A1 listening page for recognizing numbers in short spoken contexts.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Test-style Listening", "Number and Time Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Telling Time",
    url: "https://www.esl-lab.com/basic-english/telling-time/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Basic time-listening page with audio prompts, quiz practice, and script support.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Script"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Test-style Listening", "Number and Time Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Phone Numbers",
    url: "https://www.esl-lab.com/basic-english/phone-numbers/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Basic number-recognition listening page with audio, quiz, and script practice.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Script"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Test-style Listening", "Number and Time Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Calendars and Dates",
    url: "https://www.esl-lab.com/basic-english/calendars/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A1-A2",
    notes: "Basic dates-listening page with audio and quiz support for calendar language.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Script"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "News & Real-world Listening", "Simple News Listening"), {
    type: "ESL Listening Website",
    title: "VOA Learning English",
    url: "https://learningenglish.voanews.com/",
    source: "VOA Learning English",
    level: "A2-B1",
    notes: "Primary simplified-news listening source with audio, transcripts, and vocabulary support.",
    isLocal: false,
    resourceFeatures: ["Audio", "News", "Transcript", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "News & Real-world Listening", "Simple News Listening"), {
    type: "ESL Listening Website",
    title: "VOA Learning English: Let's Learn English Level 1",
    url: "https://learningenglish.voanews.com/p/5644.html",
    source: "VOA Learning English",
    level: "A1-A2",
    notes: "Beginner-friendly VOA course library with video, transcript, vocabulary, and teacher support links on source pages.",
    isLocal: false,
    resourceFeatures: ["Audio", "Video", "Transcript", "Vocabulary", "Worksheet"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "News & Real-world Listening", "Simple News Listening"), {
    type: "ESL Listening Website",
    title: "BBC Learning English",
    url: "https://www.bbc.co.uk/learningenglish",
    source: "BBC Learning English",
    level: "A2-B1",
    notes: "Primary listening and video source for short news-adjacent English learning segments.",
    isLocal: false,
    resourceFeatures: ["Audio", "Video", "News", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Business Listening", "Meeting Conversation Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: Meeting a new team member",
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-new-team-member",
    source: "British Council LearnEnglish",
    level: "A1",
    notes: "Workplace introduction listening page with audio, transcript, and comprehension exercises.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Business Listening", "Meeting Conversation Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: Organising a group project",
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/organising-group-project",
    source: "British Council LearnEnglish",
    level: "A1",
    notes: "Simple meeting-planning listening page with audio, transcript, and comprehension tasks.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Business Listening", "Meeting Conversation Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: Making a decision",
    url: "https://learnenglish.britishcouncil.org/free-resources/listening/b1/making-decision",
    source: "British Council LearnEnglish",
    level: "B1",
    notes: "Meeting decision-making listening page for higher-level extension work.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises", "Worksheet"],
    priority: "Secondary"
  }),
  resource(topicId("listening-courses", "Business Listening", "Meeting Conversation Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: ESL Program Meeting",
    url: "https://www.esl-lab.com/academic-english/esl-program-meeting/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A2-B1",
    notes: "Meeting-focused listening page with audio, quiz, transcript access, and vocabulary support.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Transcript", "Vocabulary"],
    priority: "Secondary"
  })
]
  .filter(
    (resourceItem) =>
      !selectedCuratedTopicIds.has(resourceItem.topicId) ||
      curatedExternalResources.includes(resourceItem)
  )
  .map((resourceItem, index) => ({
  id: `resource-${String(index + 1).padStart(3, "0")}`,
  ...resourceItem
  }));

await mkdir("data", { recursive: true });
await writeFile("data/categories.json", `${JSON.stringify(categories, null, 2)}\n`);
await writeFile("data/topics.json", `${JSON.stringify(topics, null, 2)}\n`);
await writeFile("data/resources.json", `${JSON.stringify(resources, null, 2)}\n`);

console.log(`Wrote ${categories.length} categories, ${topics.length} topics, ${resources.length} resources.`);
