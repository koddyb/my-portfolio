import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { initVisitCounter, getVisitCount } from "@/lib/visitCounter";
import { Sparkles, Code, Heart } from "lucide-react";

export default function Footer() {

  return (
    <footer className="border-t border-purple-500/10 py-6 bg-gradient-to-b from-background to-muted/20 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-sm text-muted-foreground text-center md:text-left flex items-center justify-center md:justify-start gap-1.5"
            whileHover={{ scale: 1.01 }}
          >
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground mt-2 md:mt-0 text-center md:text-left flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
          >
            Built with{" "}
            <motion.span
              className="inline-flex"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Code className="h-4 w-4" />
            </motion.span>
            and
            <motion.span
              className="inline-flex"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5,
              }}
            >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
