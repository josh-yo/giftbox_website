import { useState, useEffect } from 'react';
import '../stylesheets/scrollToUp.css';

function ScrollToUp(){
    const [isVisible, setIsVisible] = useState(false);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Listen to scroll events
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            // Clean up the event listener
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (<>
        {isVisible && (
            <div className="newtop" onClick={handleScrollToTop}>
                <img alt="scrollToUp" src="https://cdn1.iconfinder.com/data/icons/arrows-vol-1-5/24/Scroll_up-512.png" />
            </div>
        )}
    </>)
}

export default ScrollToUp;