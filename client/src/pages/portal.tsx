import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Rsvp } from "@shared/schema";

export default function PortalPage() {
  const [, navigate] = useLocation();
  const { user, isLoading, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading]);

  const { data: rsvps = [] } = useQuery<Rsvp[]>({
    queryKey: ["/api/rsvps/mine"],
    enabled: !!user,
  });

  const cancelRsvp = useMutation({
    mutationFn: async (eventId: number) => {
      await apiRequest("DELETE", `/api/events/${eventId}/rsvp`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rsvps/mine"] });
      toast({ title: "RSVP cancelled" });
    },
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading || !user) return null;

  return (
    <div className="space-y-0">
      <div className="mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          Member Portal
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-3">
          Welcome, {user.displayName}
        </h1>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="no-default-active-elevate capitalize">
            {user.role}
          </Badge>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      </div>

      {/* Admin shortcut */}
      {user.role === "admin" && (
        <>
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-6 mb-8">
            <p className="text-sm font-semibold text-foreground mb-1">Admin Access</p>
            <p className="text-xs text-muted-foreground mb-4">
              You have administrator privileges. Access the dashboard to manage submissions, events, publications, and site content.
            </p>
            <Link href="/admin">
              <Button size="sm" data-testid="button-go-admin">Go to Admin Dashboard</Button>
            </Link>
          </div>
          <Separator className="my-10" />
        </>
      )}

      {/* My RSVPs */}
      <section data-testid="section-my-rsvps">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
            Your Schedule
          </p>
          <h2 className="font-serif text-2xl font-bold text-foreground">My Event RSVPs</h2>
        </div>

        {rsvps.length === 0 ? (
          <div className="rounded-xl border border-card-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              You haven&apos;t RSVPed to any events yet.
            </p>
            <Link href="/events">
              <Button variant="outline" size="sm">Browse Events</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {rsvps.map((rsvp) => (
              <div
                key={rsvp.id}
                className="flex items-center justify-between p-4 rounded-lg border border-card-border bg-card"
                data-testid={`row-rsvp-${rsvp.id}`}
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">Event #{rsvp.eventId}</p>
                  <p className="text-xs text-muted-foreground">
                    RSVP confirmed &middot; {new Date(rsvp.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => cancelRsvp.mutate(rsvp.eventId)}
                  disabled={cancelRsvp.isPending}
                  data-testid={`button-cancel-rsvp-${rsvp.id}`}
                >
                  Cancel
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Separator className="my-12" />

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={false}
          data-testid="button-logout"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
