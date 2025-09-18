// frontend/src/features/notifications/NotificationCenter.tsx

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import {
  Bell,
  Check,
  X,
  Award,
  BookOpen,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";

interface Notification {
  id: string;
  type:
    | "achievement"
    | "exercise"
    | "progress"
    | "social"
    | "reminder"
    | "feedback";
  title: string;
  message: string;
  icon?: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [], refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api.get("/api/notifications").then((r) => r.data),
    refetchInterval: 30000,
  });

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => api.patch(`/api/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => api.patch("/api/notifications/read-all"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  // WebSocket dla real-time notifications - POPRAWIONE DLA VITE
  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:4000";
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "notification") {
        refetch();
        // Pokaż browser notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(data.title, {
            body: data.message,
            icon: "/logo.png",
          });
        }
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => ws.close();
  }, [refetch]);

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "achievement":
        return <Award className="w-5 h-5 text-yellow-500" />;
      case "exercise":
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case "progress":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "social":
        return <Users className="w-5 h-5 text-purple-500" />;
      case "reminder":
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case "feedback":
        return <MessageSquare className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Powiadomienia</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => markAllAsReadMutation.mutate()}
                      className="text-sm hover:underline"
                    >
                      Oznacz wszystkie jako przeczytane
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Brak nowych powiadomień</p>
                  </div>
                ) : (
                  notifications.map((notification: Notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onRead={() => markAsReadMutation.mutate(notification.id)}
                      icon={getIcon(notification.type)}
                    />
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t p-3 text-center">
                
                  <a href="/notifications"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Zobacz wszystkie powiadomienia
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const NotificationItem: React.FC<{
  notification: Notification;
  onRead: () => void;
  icon: React.ReactNode;
}> = ({ notification, onRead, icon }) => {
  return (
    <div
      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
        !notification.read ? "bg-blue-50" : ""
      }`}
      onClick={onRead}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <p className="font-medium text-sm">{notification.title}</p>
          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
          <p className="text-gray-400 text-xs mt-2">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
              locale: pl,
            })}
          </p>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
        )}
      </div>
    </div>
  );
};