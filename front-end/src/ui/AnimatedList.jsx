import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedList = ({ items, renderItem, listKey }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.ul
                key={listKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-left"
            >
                {items.map((item) => (
                    <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderItem(item)}
                    </motion.li>
                ))}
            </motion.ul>
        </AnimatePresence>
    );
};

export default AnimatedList;