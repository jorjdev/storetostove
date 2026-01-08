'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-600 to-blue-600 py-24 sm:py-32">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to transform your cooking?
          </h2>
          <p className="mt-6 text-lg leading-8 text-green-100">
            Join thousands of home cooks who are saving time and money with
            StoreToStove. Get started in minutes, no credit card required.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="mt-6 text-sm text-green-100">
            ✓ No credit card required ✓ Free forever ✓ Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}
