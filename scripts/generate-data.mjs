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
    type: "External Website",
    title: "Restaurant English Resource Search",
    url: "https://learnenglish.britishcouncil.org/search?keyword=restaurant",
    source: "British Council Search",
    level: "A1-A2",
    notes: "External search page for restaurant-related listening and vocabulary resources.",
    isLocal: false,
    priority: "Supplement",
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
  resource(topicId("listening-courses", "Daily Life Listening", "Self-introduction Listening"), {
    type: "ESL Listening Website",
    title: "British Council LearnEnglish: Meeting other students",
    url: "https://learnenglish.britishcouncil.org/skills/listening/a1-listening/meeting-other-students",
    source: "British Council LearnEnglish",
    level: "A1",
    notes: "Primary beginner listening page with audio, transcript support, and exercises.",
    isLocal: false,
    resourceFeatures: ["Audio", "Transcript", "Exercises"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Self-introduction Listening"), {
    type: "ESL Listening Website",
    title: "ELLLO main listening library",
    url: "https://elllo.org/",
    source: "ELLLO",
    level: "A1-A2",
    notes: "Large ESL listening library with short learner-friendly audio and video entries.",
    isLocal: false,
    resourceFeatures: ["Audio", "Video", "Transcript", "Vocabulary", "Interactive Quiz"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Self-introduction Listening"), {
    type: "Transcript",
    title: "Self-introduction Transcript Notes",
    url: "/resources/listening/self-introduction-transcript-notes.docx",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Editable transcript notes for collecting useful lines from primary listening pages.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Transcript", "Teacher Notes"]
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Self-introduction Listening"), {
    type: "Listening Questions",
    title: "Self-introduction Listening Questions",
    url: "/resources/listening/self-introduction-listening-questions.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Printable question sheet placeholder for gist and detail listening checks.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Questions", "Printable"]
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
    type: "Script",
    title: "Restaurant Script Organizer",
    url: "/resources/listening/restaurant-script-organizer.docx",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Editable script organizer for collecting useful restaurant listening lines.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Script", "Editable"]
  }),
  resource(topicId("listening-courses", "Daily Life Listening", "Restaurant Conversation Listening"), {
    type: "Worksheet",
    title: "Restaurant Listening Worksheet",
    url: "/resources/listening/restaurant-listening-worksheet.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Printable worksheet placeholder for pre-listening, detail listening, and review.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Worksheet", "Questions", "Printable"]
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
    type: "Answer Key",
    title: "Number and Time Listening Answer Key",
    url: "/resources/listening/number-time-answer-key.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Answer key placeholder for number, date, and time dictation checks.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Answer Key", "Printable"]
  }),
  resource(topicId("listening-courses", "Test-style Listening", "Number and Time Listening"), {
    type: "Vocabulary Notes",
    title: "Number and Time Vocabulary Notes",
    url: "/resources/listening/number-time-vocabulary-notes.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Vocabulary support placeholder for numbers, times, dates, and classroom checks.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Vocabulary", "Teacher Notes"]
  }),
  resource(topicId("listening-courses", "News & Real-world Listening", "Technology News Listening"), {
    type: "ESL Listening Website",
    title: "Randall's ESL Cyber Listening Lab: Internet Service",
    url: "https://www.esl-lab.com/academic-english/internet-service/",
    source: "Randall's ESL Cyber Listening Lab",
    level: "A2-B1",
    notes: "Primary internet-service listening page with pre-listening, audio, quiz, transcript, and vocabulary support.",
    isLocal: false,
    resourceFeatures: ["Pre-listening", "Audio", "Quiz", "Transcript", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "News & Real-world Listening", "Technology News Listening"), {
    type: "Interactive Quiz",
    title: "Internet Problems Listening Quiz",
    url: "/resources/listening/internet-problems-listening-quiz.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Quiz placeholder for troubleshooting details and service-problem vocabulary.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Quiz", "Answer Key"]
  }),
  resource(topicId("listening-courses", "News & Real-world Listening", "Technology News Listening"), {
    type: "Knowledge Points",
    title: "Internet Service Knowledge Points",
    url: "/resources/listening/internet-service-knowledge-points.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Knowledge-point notes for common internet-service terms and problem categories.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Vocabulary", "Knowledge Points"]
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
    title: "BBC Learning English",
    url: "https://www.bbc.co.uk/learningenglish",
    source: "BBC Learning English",
    level: "A2-B1",
    notes: "Primary listening and video source for short news-adjacent English learning segments.",
    isLocal: false,
    resourceFeatures: ["Audio", "Video", "News", "Vocabulary"],
    priority: "Primary"
  }),
  resource(topicId("listening-courses", "News & Real-world Listening", "Simple News Listening"), {
    type: "Transcript",
    title: "Simple News Transcript Tracker",
    url: "/resources/listening/simple-news-transcript-tracker.docx",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Editable tracker for collecting transcript links and source levels from simple news listening sites.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Transcript", "Editable"]
  }),
  resource(topicId("listening-courses", "News & Real-world Listening", "Simple News Listening"), {
    type: "Vocabulary Notes",
    title: "Simple News Vocabulary Notes",
    url: "/resources/listening/simple-news-vocabulary-notes.pdf",
    source: "Local Placeholder",
    level: "A1-A2",
    notes: "Vocabulary notes placeholder for recurring news words and teacher-selected knowledge points.",
    isLocal: true,
    downloadable: true,
    resourceFeatures: ["Vocabulary", "News"]
  })
].map((resourceItem, index) => ({
  id: `resource-${String(index + 1).padStart(3, "0")}`,
  ...resourceItem
}));

await mkdir("data", { recursive: true });
await writeFile("data/categories.json", `${JSON.stringify(categories, null, 2)}\n`);
await writeFile("data/topics.json", `${JSON.stringify(topics, null, 2)}\n`);
await writeFile("data/resources.json", `${JSON.stringify(resources, null, 2)}\n`);

console.log(`Wrote ${categories.length} categories, ${topics.length} topics, ${resources.length} resources.`);
