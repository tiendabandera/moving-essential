import { Bell, BellRing, CalendarDays, Trash } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/api/auth";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Notifications = ({ user }) => {
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const fetchNotifications = async (payload) => {
    const res = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .is("was_read", false);

    setTotalNotifications(res.count);
  };

  const fetchAllNotifications = async () => {
    const res = await supabase
      .from("notifications")
      .select("*")
      .is("was_eliminated", false)
      .order("created_at", { ascending: false })
      .limit(4);

    setNotifications(res.data);
  };

  const handlerNotification = () => {
    fetchNotifications();
    fetchAllNotifications();
  };

  const handlerMarkAsRead = async (record) => {
    if (!record.was_read) {
      await supabase
        .from("notifications")
        .update({ was_read: true })
        .eq("id", record.id);
    }

    if (record.link) navigate(record.link);
  };

  const handlerMarkAsEliminated = async (id) => {
    if (id == "all") {
      await supabase
        .from("notifications")
        .update({ was_eliminated: true, was_read: true })
        .eq("user_id", user.id);

      return;
    }

    await supabase
      .from("notifications")
      .update({ was_eliminated: true, was_read: true })
      .eq("id", id);
  };

  useEffect(() => {
    fetchNotifications();

    supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        handlerNotification
      )
      .subscribe();
  }, []);

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  return (
    <div className="flex items-center">
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {totalNotifications > 0 ? (
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <BellRing
                className="size-7 text-yellow-300 fill-yellow-300"
                strokeWidth={1.5}
              />

              {/* Animación de aparición/desaparición del contador */}
              <AnimatePresence>
                {totalNotifications > 0 && (
                  <motion.div
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-1 right-0 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center"
                  >
                    <span className="text-[9px] font-semibold text-white">
                      {totalNotifications}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <Bell
            className="size-7 text-yellow-300 fill-yellow-300"
            strokeWidth={1.5}
          />
        )}
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger />
        <SheetContent className="!w-[90%] md:w-3/4">
          <SheetHeader>
            <SheetTitle className="flex flex-col gap-4 items-start">
              <span>Notifications</span>
              <div className="flex gap-4">
                <Button
                  size="sm"
                  className="bg-color-1 border border-color-1 hover:bg-transparent hover:text-color-1"
                  onClick={() => handlerMarkAsEliminated("all")}
                >
                  Delete all
                </Button>
                <Button
                  size="sm"
                  className="bg-color-1 border border-color-1 hover:bg-transparent hover:text-color-1"
                  onClick={() => navigate("company/notifications")}
                >
                  See all
                </Button>
              </div>
            </SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <div className="flex flex-col h-screen">
            <div className="mt-4 flex flex-col gap-4 ring-1 ring-gray-200 rounded-md p-4">
              <div className="flex flex-col gap-6">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      className={`cursor-pointer ${
                        index !== 0 ? "border-t border-gray-200 pt-6" : ""
                      }`}
                      key={notification.id}
                      onClick={() => handlerMarkAsRead(notification)}
                    >
                      <div
                        className={`flex flex-col p-2 gap-2 ${
                          !notification.was_read
                            ? "bg-blue-300/40 rounded-md "
                            : ""
                        }`}
                      >
                        <p className="text-gray-50 font-light text-sm text-justify">
                          {notification.message}
                        </p>
                        <div className="flex gap-1 items-center">
                          <CalendarDays
                            strokeWidth={1.5}
                            width={18}
                            height={18}
                          />
                          <span className="text-xs font-medium">
                            {new Date(notification.created_at).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short", // Short month (Jan, Feb, Mar, etc.)
                                year: "numeric",
                              }
                            )}
                          </span>
                          <Trash
                            strokeWidth={1.5}
                            width={18}
                            height={18}
                            className="cursor-pointer ml-auto  hover:fill-black/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlerMarkAsEliminated(notification.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-center">
                    You have no notifications
                  </span>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Notifications;
