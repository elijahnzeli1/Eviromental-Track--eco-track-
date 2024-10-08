import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Recycle, Users, Coins, ChevronDown, Mail } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#FFFAF0] text-gray-800">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/placeholder.svg?height=32&width=32" alt="Eco-Track Logo" className="w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold text-green-600">Eco-Track</h1>
          </div>
          <div>
            <Link href="/login">
              <Button variant="ghost" className="mr-4">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-green-600 text-white hover:bg-green-700">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-green-600 mb-6">
            Transform Waste into Wealth
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join Eco-Track and make a difference in the world while earning rewards.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-xl bg-green-600 text-white hover:bg-green-700">Get Started</Button>
          </Link>
        </div>

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

        <div className="relative h-96 rounded-lg overflow-hidden mb-16">
          <div className="absolute inset-0 bg-green-600 opacity-20"></div>
          <img
            src="/placeholder.svg?height=400&width=800"
            alt="Environmental Impact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Join the Eco-Revolution</h3>
              <p className="text-xl mb-6">Every action counts towards a sustainable future</p>
              <Link href="/learn-more">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-green-600 mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Recycle className="h-8 w-8 text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Collect Waste</h4>
              <p className="text-gray-600">Gather inorganic waste from your surroundings</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Dispose Properly</h4>
              <p className="text-gray-600">Use Eco-Track to find proper disposal locations</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <Coins className="h-8 w-8 text-yellow-500" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Earn Rewards</h4>
              <p className="text-gray-600">Get Eco-Tokens for your contributions</p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-green-600 mb-6 text-center">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="text-4xl font-bold text-green-600 mb-2">10,000+</h4>
                <p className="text-gray-600">Active Users</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="text-4xl font-bold text-green-600 mb-2">50 tons</h4>
                <p className="text-gray-600">Waste Collected</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="text-4xl font-bold text-green-600 mb-2">$100,000+</h4>
                <p className="text-gray-600">Rewards Distributed</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-green-600 mb-6 text-center">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">"Eco-Track has made it so easy for me to contribute to a cleaner environment. The rewards are a great bonus!"</p>
                <p className="font-semibold">- Sarah J.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">"I love the community challenges. It's inspiring to see so many people working together for a common cause."</p>
                <p className="font-semibold">- Michael T.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">"The Eco-Tokens are a great incentive. I've been able to get some amazing eco-friendly products with my rewards."</p>
                <p className="font-semibold">- Emily R.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
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
        </div>

        <div className="mb-16">
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
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-green-600 mb-6">Ready to Make a Difference?</h3>
          <Link href="/signup">
            <Button size="lg" className="text-xl bg-green-600 text-white hover:bg-green-700">Join Eco-Track Today</Button>
          </Link>
        </div>
      </main>

    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}