"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { executeChatAction } from "@/app/(dashboardLayout)/_chatAction";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "bot";
  content: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi there! I'm your SplitEase AI assistant. Ask me anything about your houses, expenses, meals, or deposits!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await executeChatAction(userMessage);
      
      const responseText = result?.data?.response || result?.message || "Hmm, I'm not sure how to respond to that.";

      if (result.error) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Sorry, I encountered an error: " + result.error },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: responseText },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, something went wrong connecting to the server." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="w-[350px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-120px)] mb-4 flex flex-col shadow-2xl border border-border/50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CardHeader className="p-4 border-b bg-stone-50/50 dark:bg-stone-900/50 flex flex-row items-center justify-between space-y-0 pb-3 h-14">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                <Bot size={18} />
              </div>
              <div className="flex flex-col">
                 <span className="font-bold text-sm tracking-tight text-foreground">SplitEase AI</span>
                 <span className="text-[10px] text-emerald-500 font-semibold tracking-widest uppercase">Online</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden relative">
            <ScrollArea className="h-[380px] p-4">
              <div className="space-y-4 pb-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm shadow-sm",
                      msg.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground rounded-tr-sm"
                        : "mr-auto bg-muted/80 border font-medium text-foreground rounded-tl-sm"
                    )}
                  >
                    {msg.role === "bot" ? (
                      <div className="whitespace-pre-wrap leading-relaxed break-words">
                        {msg.content}
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="mr-auto bg-muted/80 border font-medium text-foreground rounded-2xl rounded-tl-sm px-4 py-3 text-sm shadow-sm w-fit flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-muted-foreground text-xs font-bold">Thinking...</span>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>
          
          <CardFooter className="p-3 border-t bg-stone-50/50 dark:bg-stone-900/50 mt-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex w-full items-center gap-2 relative"
            >
              <Input
                placeholder="Message AI assistant..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-white dark:bg-black rounded-xl pr-10 focus-visible:ring-primary/20"
                autoFocus
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="absolute right-0 w-8 h-8 rounded-lg"
              >
                <Send size={14} className="ml-0.5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group",
          isOpen ? "bg-muted text-foreground hover:bg-muted/80 scale-90" : "bg-primary text-primary-foreground"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-pulse" />}
      </Button>
    </div>
  );
};
