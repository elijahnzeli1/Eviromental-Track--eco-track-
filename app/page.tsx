'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Recycle, Users, Coins, ChevronDown, Mail, LogIn, UserPlus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { motion } from 'framer-motion'

export default function Component() {
  const [isLoginHovered, setIsLoginHovered] = useState(false)
  const [isSignUpHovered, setIsSignUpHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFAF0] to-[#E6F7FF] text-gray-800">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/favicon.ico" alt="Eco-Track Logo" className="w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold text-green-600">Eco-Track</h1>
          </motion.div>
          <div className="flex items-center">
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsLoginHovered(true)}
                onHoverEnd={() => setIsLoginHovered(false)}
              >
                <Button variant="ghost" className="mr-4 relative">
                  <LogIn className={`mr-2 h-4 w-4 transition-opacity duration-300 ${isLoginHovered ? 'opacity-100' : 'opacity-0'}`} />
                  Login
                </Button>
              </motion.div>
            </Link>
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsSignUpHovered(true)}
                onHoverEnd={() => setIsSignUpHovered(false)}
              >
                <Button className="bg-green-600 text-white hover:bg-green-700 relative">
                  <UserPlus className={`mr-2 h-4 w-4 transition-opacity duration-300 ${isSignUpHovered ? 'opacity-100' : 'opacity-0'}`} />
                  Sign Up
                </Button>
              </motion.div>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-green-600 mb-6">
            Transform Waste into Wealth
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join Eco-Track and make a difference in the world while earning rewards.
          </p>
          <Link href="/signup">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="text-xl bg-green-600 text-white hover:bg-green-700">Get Started</Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <EnvironmentAnimation />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Leaf className="h-12 w-12 text-green-500" />}
            title="Environmental Impact"
            description="Contribute to a cleaner environment by properly disposing of inorganic waste."
          />
          <FeatureCard
            icon={<Recycle className="h-12 w-12 text-blue-500" />}
            title="Waste Collection"
            description="Participate in organized waste collection drives and recycling initiatives."
          />
          <FeatureCard
            icon={<Users className="h-12 w-12 text-purple-500" />}
            title="Community Engagement"
            description="Connect with like-minded individuals and participate in eco-challenges."
          />
          <FeatureCard
            icon={<Coins className="h-12 w-12 text-yellow-500" />}
            title="Earn Eco-Tokens"
            description="Get rewarded with convertible tokens for your sustainable actions."
          />
        </div>

        <motion.div 
          className="relative h-96 rounded-lg overflow-hidden mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-green-600 opacity-20"></div>
          <img
            src="/assets/placeholder.svg?height=400&width=800"
            alt="Environmental Impact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Join the Eco-Revolution</h3>
              <p className="text-xl mb-6">Every action counts towards a sustainable future</p>
              <Link href="/learn-more">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                    Learn More
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-green-600 mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowItWorksCard
              icon={<Recycle className="h-8 w-8 text-blue-500" />}
              title="Collect Waste"
              description="Gather inorganic waste from your surroundings"
            />
            <HowItWorksCard
              icon={<Leaf className="h-8 w-8 text-green-500" />}
              title="Dispose Properly"
              description="Use Eco-Track to find proper disposal locations"
            />
            <HowItWorksCard
              icon={<Coins className="h-8 w-8 text-yellow-500" />}
              title="Earn Rewards"
              description="Get Eco-Tokens for your contributions"
            />
          </div>
        </motion.div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-green-600 mb-6 text-center">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImpactCard number="10,000+" text="Active Users" />
            <ImpactCard number="50 tons" text="Waste Collected" />
            <ImpactCard number="$100,000+" text="Rewards Distributed" />
          </div>
        </motion.div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-green-600 mb-6 text-center">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Eco-Track has made it so easy for me to contribute to a cleaner environment. The rewards are a great bonus!"
              author="Sarah J."
            />
            <TestimonialCard
              quote="I love the community challenges. It's inspiring to see so many people working together for a common cause."
              author="Michael T."
            />
            <TestimonialCard
              quote="The Eco-Tokens are a great incentive. I've been able to get some amazing eco-friendly products with my rewards."
              author="Emily R."
            />
          </div>
        </motion.div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-green-600 mb-6 text-center">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I earn Eco-Tokens?</AccordionTrigger>
              <AccordionContent>
                You can earn Eco-Tokens by participating in waste collection activities, recycling initiatives, and community challenges. The more you contribute, the more tokens you earn!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What can I do with my Eco-Tokens?</AccordionTrigger>
              <AccordionContent>
                Eco-Tokens can be redeemed for eco-friendly products, discounts on sustainable services, or even converted to cash donations to environmental charities.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does Eco-Track verify my contributions?</AccordionTrigger>
              <AccordionContent>
                We use a combination of GPS tracking, photo verification, and community validation to ensure all contributions are genuine and impactful.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-green-600 mb-6 text-center">Stay Updated</h3>
          <Card>
            <CardContent className="p-6">
              <form className="flex flex-col sm:flex-row gap-4">
                <Input type="email" placeholder="Enter your email" className="flex-grow" />
                <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
                  <Mail className="mr-2 h-4 w-4" /> Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-green-600 mb-6">Ready to Make a Difference?</h3>
          <Link href="/signup">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="text-xl bg-green-600 text-white hover:bg-green-700">Join Eco-Track Today</Button>
            </motion.div>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <motion.div 
            className="mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function HowItWorksCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  )
}

function ImpactCard({ number, text }: { number: string; text: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card>
        <CardContent className="p-6 text-center">
          <motion.h4 
            className="text-4xl font-bold text-green-600 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {number}
          </motion.h4>
          <p className="text-gray-600">{text}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <p className="text-gray-600 mb-4">&ldquo;{quote}&rdquo;</p>
          <p className="font-semibold text-right">- {author}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Placeholder for EnvironmentAnimation
function EnvironmentAnimation() {
  return (
    <div className="bg-green-100 p-8 rounded-lg text-center">
      <p className="text-green-600 font-semibold">Environment Animation Placeholder</p>
      <p className="text-sm text-gray-600">Implement the actual animation component here.</p>
    </div>
  )
}