import { useEffect } from "react";
import { useParams, useLocation } from "wouter";

export default function InsightRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate(`/insights`, { replace: true });
    setTimeout(() => {
      const el = document.getElementById(`post-${slug}`);
      if (el) {
        const offset = 96;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 150);
  }, [slug, navigate]);

  return null;
}
