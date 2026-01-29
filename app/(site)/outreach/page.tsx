import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Outreach - SOBA Calgary",
  description: "Learn about SOBA Calgary's community outreach programs and how we support both local and international communities.",
};

const outreachPrograms = [
  {
    id: 1,
    title: "Poverty Alleviation & Economic Support",
    description: "Providing access to information, referrals, skills training opportunities, and community resources aimed at reducing financial hardship and improving economic stability.",
    icon: "💼",
    impact: "Community members supported",
    activities: [
      "Financial literacy workshops",
      "Job placement assistance",
      "Small business development support",
      "Resource navigation and referrals"
    ]
  },
  {
    id: 2,
    title: "Youth Development & Leadership",
    description: "Empowering youth through mentorship, leadership development, educational support, and life-skills programming.",
    icon: "👥",
    impact: "Youth engaged annually",
    activities: [
      "Mentorship programs",
      "Leadership development workshops",
      "Educational support and tutoring",
      "Life-skills training"
    ]
  },
  {
    id: 3,
    title: "Skills Development & Capacity Building",
    description: "Delivering workshops and training programs that build employability, leadership capacity, and self-reliance.",
    icon: "📚",
    impact: "Training participants annually",
    activities: [
      "Vocational training workshops",
      "Leadership capacity building",
      "Employability skills development",
      "Self-reliance programs"
    ]
  },
  {
    id: 4,
    title: "Newcomer & Family Support",
    description: "Supporting newcomers and families through orientation, referrals, and community navigation.",
    icon: "👨‍👩‍👧‍👦",
    impact: "Families supported",
    activities: [
      "Orientation sessions",
      "Community navigation support",
      "Referrals to social services",
      "Integration workshops"
    ]
  },
  {
    id: 5,
    title: "Mental Wellbeing & Social Inclusion",
    description: "Promoting mental wellbeing and social inclusion through awareness sessions and peer engagement.",
    icon: "🧠",
    impact: "Community members reached",
    activities: [
      "Mental health awareness sessions",
      "Peer engagement activities",
      "Community support groups",
      "Wellbeing workshops"
    ]
  },
  {
    id: 6,
    title: "Education & Lifelong Learning",
    description: "Supporting academic success, career exploration, and lifelong learning opportunities.",
    icon: "🎓",
    impact: "Students supported",
    activities: [
      "Academic support and tutoring",
      "Career exploration workshops",
      "Educational workshops",
      "Lifelong learning programs"
    ]
  },
  {
    id: 7,
    title: "Community Outreach & Civic Engagement",
    description: "Encouraging active community participation through outreach initiatives and volunteerism.",
    icon: "🤝",
    impact: "Volunteers engaged",
    activities: [
      "Outreach initiatives",
      "Volunteer programs",
      "Civic awareness activities",
      "Community events"
    ]
  },
  {
    id: 8,
    title: "Cultural Preservation & Community Connection",
    description: "Promoting cultural understanding, heritage education, and intercultural dialogue.",
    icon: "🌍",
    impact: "Community members engaged",
    activities: [
      "Cultural awareness workshops",
      "Heritage education programs",
      "Intercultural dialogue events",
      "Community connection activities"
    ]
  }
];

const partnerships = [
  {
    name: "Local Schools",
    description: "Partnering with schools in SOBA Calgary to support Cameroonian-Canadian students",
    logo: "🏫"
  },
  {
    name: "Healthcare Organizations",
    description: "Collaborating with medical professionals for health outreach",
    logo: "🩺"
  },
  {
    name: "Community Centers",
    description: "Working with local centers to host community events",
    logo: "🏢"
  },
  {
    name: "International NGOs",
    description: "Partnering with organizations for projects in Cameroon",
    logo: "🌍"
  }
];

export default function OutreachPage() {
  return (
    <main>
      <section className="pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Community Outreach
            </h1>
            <p className="mb-10 text-lg">
              Making a positive impact in communities across SOBA Calgary and Cameroon through 
              collaborative programs and sustainable initiatives
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mb-16 rounded-lg bg-primary/10 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Our Outreach Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              To create lasting positive change by leveraging our collective resources, 
              expertise, and networks to support education, healthcare, and community 
              development initiatives that uplift and empower communities.
            </p>
          </div>

          {/* Outreach Programs */}
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-black dark:text-white">
              Our Programs
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {outreachPrograms.map((program) => (
                <div
                  key={program.id}
                  className="rounded-lg bg-white p-6 shadow-solid-8 dark:bg-blacksection"
                >
                  <div className="mb-4 flex items-center space-x-3">
                    <span className="text-3xl">{program.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-black dark:text-white">
                        {program.title}
                      </h3>
                      <p className="text-sm text-primary">{program.impact}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    {program.description}
                  </p>
                  
                  <div>
                    <h4 className="mb-2 font-semibold text-black dark:text-white">
                      Key Activities:
                    </h4>
                    <ul className="space-y-1">
                      {program.activities.map((activity, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <span className="text-primary">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="mb-16 rounded-lg bg-white p-8 shadow-solid-8 dark:bg-blacksection">
            <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">100+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Community Members Supported</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Youth Engaged</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">20+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Workshops Delivered</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">15+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Families Supported</p>
              </div>
            </div>
          </div>

          {/* Partnerships */}
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-black dark:text-white">
              Our Partners
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {partnerships.map((partner, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 text-center shadow-solid-8 dark:bg-blacksection"
                >
                  <div className="mb-3 text-4xl">{partner.logo}</div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Get Involved */}
          <div className="rounded-lg bg-primary/10 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Get Involved
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Join us in making a difference! Whether through volunteering, donations, 
              or partnerships, there are many ways to contribute to our outreach efforts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/donations"
                className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
              >
                Make a Donation
              </Link>
              <Link
                href="/membership"
                className="rounded-lg border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Become a Member
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-stroke px-6 py-3 text-black transition-colors hover:border-primary hover:text-primary dark:border-strokedark dark:text-white dark:hover:border-primary dark:hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 