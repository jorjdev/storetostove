'use client'

import { motion } from 'framer-motion'
import { ChefHat, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-20 sm:py-32">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-green-200/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Recipe Planning
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl"
          >
            From Store to{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Stove
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 text-lg leading-8 text-gray-600 sm:text-xl"
          >
            Get AI-generated recipe ideas, manage your shopping lists, and see
            exactly how much each meal costs at your favorite stores. Cook
            smarter, not harder.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/login">
              <Button size="lg" className="text-lg">
                <ChefHat className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg">
                View Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 text-sm text-gray-500"
          >
            No credit card required • Free forever • 5 min setup
          </motion.div>
        </div>
      </div>
    </section>
  )
}
