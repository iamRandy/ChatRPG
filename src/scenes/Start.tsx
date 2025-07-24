import React, { useEffect, useState } from "react";
import { ArrowBigRightDash } from "lucide-react";
import { AnimatePresence, motion } from "motion/react"

interface NameScenePropTypes {
    mode: null | string;
    setMode: (value: null | string) => void;
}

const NameScene: React.FC<NameScenePropTypes> = ({ mode, setMode }) => {
    const [name, setName] = useState<string>("");
    
    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleSubmitName = () => {
        window.alert(`Your character's name is ${name}`);
    }

    return (
        <motion.h1
            key="prompt-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{
                opacity: 1, y: 0,
                transition: { duration: 1, delay: 1.5 }
            }}
            onAnimationComplete={latest => {
                if (latest.opacity === 1) {
                    setMode("name-input");
                }
            }}
            exit={{
                opacity: 0, y: -20,
                transition: { duration: 1 }
            }}
            className="relative"
        >
            What is your name, <span className="italic">Traveler</span>?
            {mode && mode === "name-input" &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-5 text-sm absolute w-full">
                    <span className={`flex justify-center placeholder-opacity-100 ${(name !== "") ? "text-white" : "text-[#354058]"}`}>
                        <input className="w-52 focus:outline-none" type="text" placeholder="Enter a name for your character..."
                        onChange={handleNameInput} value={name} />
                        <button className="cursor-pointer scale-100 hover:scale-110"
                        onClick={handleSubmitName}>
                            <ArrowBigRightDash className="w-6 h-6" />
                        </button>
                    </span>
                </motion.div>
            }
        </motion.h1>
    );
}

const Start = () => {
    const [hasClicked, setHasClicked] = useState<boolean>(false); // Hint user to click
    const [showPrompt, setShowPrompt] = useState(0);
    const [canNext, setCanNext] = useState<boolean>(false);
    const [mode, setMode] = useState<null | string>(null);

    // useEffect(() => {
    //     console.log("canNext state changed:", canNext);
    // }, [canNext])

    const handleNextPrompt = () => {
        if (!canNext) return;
        if (!hasClicked) setHasClicked(true);

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
                        onAnimationComplete={latest => {
                            if (latest.opacity === 1) {
                                setCanNext(true);
                            }
                        }}
                        exit={{ opacity: 0, y: -20,
                            transition: { duration: 1 } }}
                        >
                            Ahh, you're finally awake.
                        </motion.h1>
                    )}

                    {showPrompt === 1 && (
                        <NameScene mode={mode} setMode={setMode} />
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {!hasClicked &&
                // bounce on enter and exit
                    <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5, ease: "easeInOut", delay: 5 }
                    }}
                    exit={{
                        opacity: 0, 
                        y: 10,
                        transition: { duration: 0.5, ease: "easeInOut" }
                    }}
                    className="translate-y-10 absolute mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-[#354058]">
                        Click to continue...
                    </motion.p>
                }       
            </AnimatePresence>
        </div>
    );
}

export default Start;