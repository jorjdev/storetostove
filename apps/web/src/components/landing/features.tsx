'use client'

import { motion } from 'framer-motion'
import {
  Sparkles,
  ShoppingCart,
  DollarSign,
  TrendingDown,
  ListChecks,
  Zap,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'

const features = [
  {
    icon: Sparkles,
    title: 'AI Recipe Generation',
    description:
      'Get personalized recipe suggestions based on your preferences, dietary needs, and what you have on hand.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: ShoppingCart,
    title: 'Smart Shopping Lists',
    description:
      'Automatically generate shopping lists from recipes and organize them by store aisle for efficient shopping.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: DollarSign,
    title: 'Real-Time Pricing',
    description:
      'See accurate cost estimates for recipes at nearby supermarkets before you shop.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingDown,
    title: 'Price Per Protein',
    description:
      'Compare nutrition metrics like price per protein and price per calorie to maximize value.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: ListChecks,
    title: 'Meal Planning',
    description:
      'Plan your weekly meals and track what you need to buy all in one place.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Get instant recipe suggestions and price updates powered by modern AI technology.',
    gradient: 'from-yellow-500 to-orange-500',
  },
]

export function Features() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to cook smarter
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Powerful features to help you save time and money in the kitchen
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative h-full overflow-hidden border-gray-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} p-2 shadow-lg`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="mb-2 text-xl">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Hover gradient effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
