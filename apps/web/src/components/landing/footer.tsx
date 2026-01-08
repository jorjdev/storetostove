import { ChefHat } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">
                StoreToStove
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              AI-powered recipe planning and smart shopping lists. Cook smarter,
              save money, and eat better.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#demo"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} StoreToStove. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
