import React from "react";
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are your charges?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>VidyaUdbhav platform par students ke liye hamari saari guidance aur counseling services bilkul free hain.</p><p>Hum students se admission, counseling ya career guidance ke liye koi fees charge nahi karte.</p>",
      },
    },
    {
      "@type": "Question",
      name: "How is VidyaUdbhav different from others?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>VidyaUdbhav ek unbiased education guidance platform hai jo students ko sahi college, course aur career choose karne me madad karta hai.</p><ul><li>Sirf verified colleges aur courses list kiye jaate hain</li><li>Simple aur transparent information provide ki jaati hai</li><li>Kisi ek college ko force nahi kiya jaata</li></ul>",
      },
    },
    {
      "@type": "Question",
      name: "Why take admission through VidyaUdbhav?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>VidyaUdbhav students ko end-to-end support deta hai — course selection se lekar admission process tak.</p><p>Hamare experts students ki profile ke according best options suggest karte hain.</p>",
      },
    },
    {
      "@type": "Question",
      name: "Is VidyaUdbhav an independent platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>Haan, VidyaUdbhav ek completely independent platform hai.</p><p>Hum colleges ke commission ya paid promotions par depend nahi karte.</p>",
      },
    },
    {
      "@type": "Question",
      name: "What is VidyaUdbhav?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>VidyaUdbhav ek education guidance platform hai jo students ko colleges, courses, admissions aur career options ke baare me sahi information deta hai.</p><p>Hum students ko confusion se clarity tak le jaate hain.</p>",
      },
    },
    {
      "@type": "Question",
      name: "What post-admission benefits do I get from VidyaUdbhav?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>Admission ke baad bhi VidyaUdbhav students ko support karta hai.</p><p>Isme academic guidance, documentation help aur career counseling include hai.</p>",
      },
    },
    {
      "@type": "Question",
      name: "Why should I trust VidyaUdbhav?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>Trust ek din me nahi banta, isliye hum actions par believe karte hain.</p><ul><li>Transparent process</li><li>Independent guidance</li><li>Student-first approach</li></ul>",
      },
    },
    {
      "@type": "Question",
      name: "Do payments go directly to the college?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>Haan, course fees directly college ya university ke official account me pay hoti hai.</p><p>VidyaUdbhav sirf guidance aur support provide karta hai.</p>",
      },
    },
    {
      "@type": "Question",
      name: "How does VidyaUdbhav make money?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>VidyaUdbhav students se koi fees charge nahi karta.</p><p>Hamari income institutional consulting aur professional services se aati hai.</p>",
      },
    },
    {
      "@type": "Question",
      name: "Where is VidyaUdbhav office located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "<p>VidyaUdbhav ka office yahan located hai:</p><p>Greater Noida, Gaur City Center, 8th Floor – 0899</p>",
      },
    },
  ],
};

const page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
};

export default page;
