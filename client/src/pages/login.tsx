import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const loginFormSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password required"),
});

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { user, login, loginPending } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) navigate(user.role === "admin" ? "/admin" : "/portal");
  }, [user]);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    try {
      const u = await login(data);
      navigate(u?.role === "admin" ? "/admin" : "/portal");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: err.message.replace(/^\d+:\s*/, ""),
      });
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            Member Access
          </p>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Access the Critical Innovation member portal.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@institution.edu"
                      data-testid="input-login-email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      data-testid="input-login-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={loginPending}
              data-testid="button-login-submit"
            >
              {loginPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Join the Network
          </Link>
        </p>
      </div>
    </div>
  );
}
