import { useEffect } from "react";
import { useLocation } from "wouter";

export default function RegisterPage() {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate("/login");
  }, []);
  return null;
}
