export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  program?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 'graduate-1',
    quote: "The Meta Social Media Marketing Certificate gave me the practical skills I needed to transition into digital marketing. The hands-on projects were invaluable.",
    author: "Program Graduate",
    role: "Marketing Manager",
    program: "Meta Social Media Marketing"
  },
  {
    id: 'graduate-2',
    quote: "The Google Data Analytics Certificate helped me develop the analytical skills needed for my career transition. The curriculum was comprehensive and practical.",
    author: "Certificate Graduate",
    role: "Data Analyst",
    program: "Google Data Analytics"
  },
  {
    id: 'graduate-3',
    quote: "The structured learning path and industry-recognized certification made all the difference in my job search. I highly recommend these programs.",
    author: "Recent Graduate",
    role: "Digital Marketing Specialist",
    program: "Meta Marketing Analytics"
  }
];

export function getFeaturedTestimonial(): Testimonial {
  return testimonials[0];
}

export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}