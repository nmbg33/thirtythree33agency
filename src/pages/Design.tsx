import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Design() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Design</h1>
            <p className="text-lg text-gray-600">
              We craft systems: typography, color, motion, and components that
              scale. A visual language that is both beautiful and brutally
              clear.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3">What we do</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Brand identity & design systems</li>
                <li>• UI/UX for web & product</li>
                <li>• Micro-interactions & motion</li>
                <li>• Art direction and content guides</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 bg-white rounded-2xl border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3">Outcomes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• High-fidelity prototypes</li>
                <li>• Design tokens & documentation</li>
                <li>• Accessible, responsive layouts</li>
                <li>• Conversion-focused UI patterns</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
