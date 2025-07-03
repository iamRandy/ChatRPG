import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react"

const Start = () => {
    const [showHint, setShowHint] = useState(false);
    const [showPrompt, setShowPrompt] = useState(0);
    const [canNext, setCanNext] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowHint(true);
        }, 5000);
    }, []);

    const handleNextPrompt = () => {
        if (!canNext) return;
        if (showHint) setShowHint(false);
        setCanNext(false);
        setShowPrompt(showPrompt + 1);
    }

    return (
        <div 
        onClick={handleNextPrompt}
        className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl w-full h-full flex flex-col justify-center 
        items-center overflow-hidden">
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto text-center">
                <AnimatePresence mode="wait">
                    {showPrompt === 0 && (
                        <motion.h1
                        key="prompt-0"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, 
                            transition: { duration: 1, delay: 1.5 } }}
                        onAnimationComplete={() => setCanNext(true)}
                        exit={{ opacity: 0, y: -20,
                            transition: { duration: 1 } }}
                        >
                            Ahh, you're finally awake.
                        </motion.h1>
                    )}

                    {showPrompt === 1 && (
                        <motion.h1
                        key="prompt-1"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, 
                            transition: { duration: 1, delay: 1.5 } }}
                        onAnimationComplete={() => setCanNext(true)}
                        exit={{ opacity: 0, y: -20,
                            transition: { duration: 1 } }}
                        >
                            What is your name, Traveler?
                        </motion.h1>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {showHint &&
                    <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0,
                        transition: { duration: 1 } }}
                    exit={{opacity: 0, y: 10,
                        transition: { duration: 1 } }}
                    className="bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 absolute mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-[#354058]">
                        Click to continue...
                    </motion.p>
                }       
            </AnimatePresence>
        </div>
    );
}

export default Start;