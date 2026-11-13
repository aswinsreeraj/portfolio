import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const PROFILE_QUIPS = [
  // Simple, witty & welcoming for everyone
  "I'm officially Aswin's Chief Morale Gopher. Salary: unlimited virtual peanuts.",
  "Aswin builds the behind-the-scenes engine of apps—basically the plumbing, minus the leaks!",
  "Remote work or relocating? His suitcase practically stays half-packed by the door.",
  "Aswin won Overall Best Performer at Brototype (June 2026). Naturally, I take half the credit.",
  "Notice there are no fake '100% Expert' bars on this site? Refreshingly honest humans live here.",
  "Fun fact: almost everything you click on this site shows real work—no empty placeholder fluff.",
  "Hiring Aswin gets you reliable backend systems. Hiring me gets you free desk supervision.",
  "Got a question about Aswin? Poke the chat widget above—that AI refuses to exaggerate!",
  "Double-click anywhere on the screen if you feel like tossing me a snack! 🥜",
  "Aswin likes designing ideas on paper first—fixing mistakes with an eraser is way cheaper.",
  "Most portfolios feel like a static billboard; this one comes with a slightly spoiled mascot.",

  // Occasional light tech jokes for developers
  "Aswin writes Go all day, which means 40% logic and 60% typing 'if err != nil'.",
  "Zero race conditions detected today—mostly because I sprinted across the footer first!",
  "My favorite engineering feature? Graceful shutdown. Also applies to me when snacks run out.",
];

const ROUTE_QUIPS: { prefix: string; quips: string[] }[] = [
  {
    prefix: '/projects/arda',
    quips: [
      "Think of ARDA like airport security for AI assistants—no unapproved moves allowed past the gate!",
      "ARDA double-checks its own confidence before acting. Honestly, humans could try that too.",
      "Parts of ARDA are still being built, and Aswin tells you straight up instead of faking a demo.",
    ],
  },
  {
    prefix: '/projects/evntx',
    quips: [
      "Two fans clicking the last concert ticket at the exact same second? EVNTX makes sure nobody double-books.",
      "Paid a split second too late for a ticket hold? EVNTX automatically refunds you. Very polite code.",
      "Built EVNTX so event organizers get tidy payouts without chaotic spreadsheet math.",
    ],
  },
  {
    prefix: '/projects/tenome',
    quips: [
      "Tenome reads web pages fast, finds answers quickly, and shrinks long reads into bite-sized summaries.",
      "Aswin once gave Tenome a giant AI model, watched it run out of memory, and smartly swapped in a smaller one.",
      "Even if one task misbehaves in Tenome, the rest of the kitchen keeps cooking smoothly.",
    ],
  },
  {
    prefix: '/skills',
    quips: [
      "Zero buzzword bingo here—tap any skill card to see what Aswin actually built with it.",
      "Kept these cards short on purpose! Nobody wants an essay just to scan a toolkit.",
    ],
  },
  {
    prefix: '/about',
    quips: [
      "Engineering started in Electronics before Aswin fell in love with building web backends—what a plot twist!",
      "Have a scroll through the timeline—every chapter explains why he obsesses over things running smoothly.",
    ],
  },
  {
    prefix: '/contact',
    quips: [
      "No awkward 12-box contact form here—just one click straight to Aswin's inbox in Kerala.",
      "Dropping an email to aswinsreeraj96@gmail.com? Don't be shy—he checks it multiple times a day!",
    ],
  },
];

const WAKE_QUIPS = [
  "Whoa—I was right in the middle of a dream about a mountain of cheese!",
  "Hey! Five more minutes... okay fine, I'm awake, keep exploring!",
  "Nap interrupted! Hope you brought a snack or an interesting question.",
];

const DROP_QUIPS = [
  "Whew! Good thing Gophers come with built-in bounce suspension!",
  "10/10 skydiving form—next time try double-clicking for snacks instead!",
  "Safe landing! My whiskers barely even ruffled.",
];

function pickPersonalizedQuip(pathname: string, lastQuip: string | null): string {
  const matched = ROUTE_QUIPS.find((r) => pathname.startsWith(r.prefix));
  const pool =
    matched && Math.random() < 0.55
      ? matched.quips
      : matched
      ? [...matched.quips, ...PROFILE_QUIPS]
      : PROFILE_QUIPS;

  const candidates = pool.filter((q) => q !== lastQuip);
  const source = candidates.length > 0 ? candidates : PROFILE_QUIPS;
  return source[Math.floor(Math.random() * source.length)];
}

const SNACK_EMOJIS = ['🥜', '🧀', '🥕', '🍪', '🍓', '🍰', '🍕', '🍉', '🥑', '🍩'];

interface SnackItem {
  id: string;
  emoji: string;
  startX: number;
  startY: number;
  targetVw: number;
  isEaten: boolean;
  spawnTime: number;
}

interface GopherPetProps {
  onOpenAskModal?: (query?: string) => void;
}

export const GopherPet: React.FC<GopherPetProps> = () => {
  const { pathname } = useLocation();
  // Positioning & movement state (compact half-size)
  const [posX, setPosX] = useState<number>(84); // percentage across viewport (sits peacefully near corner)
  const [direction, setDirection] = useState<1 | -1>(-1); // facing inward toward the page
  const [isWaddling, setIsWaddling] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [moveDuration, setMoveDuration] = useState<number>(2400);
  const [isPeeking, setIsPeeking] = useState<'left' | 'right' | null>(null);

  // User visibility preference (can be hidden or snoozed for zero distraction)
  const [isHidden, setIsHidden] = useState<boolean>(() => {
    try {
      return localStorage.getItem('gopher_pet_hidden') === 'true';
    } catch {
      return false;
    }
  });

  // Eye & pupil tracking (larger, expressive Go Gopher pupils)
  const [leftPupil, setLeftPupil] = useState<{ x: number; y: number }>({ x: -16, y: -10 });
  const [rightPupil, setRightPupil] = useState<{ x: number; y: number }>({ x: -16, y: -10 });
  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  // Sleeping state
  const [isSleeping, setIsSleeping] = useState<boolean>(false);

  // Speech bubble state
  const [speechText, setSpeechText] = useState<string | null>(null);

  // Snack feeding state
  const [snacks, setSnacks] = useState<SnackItem[]>([]);
  const isFeedingRef = useRef<boolean>(false);

  // Pick and drop state
  const [isPickedUp, setIsPickedUp] = useState<boolean>(false);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [dropAnimating, setDropAnimating] = useState<boolean>(false);
  const [isLanding, setIsLanding] = useState<boolean>(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dropPos, setDropPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dropBottom, setDropBottom] = useState<number>(0);
  const [dropDuration, setDropDuration] = useState<number>(300);

  // Refs for drag tracking and synchronization
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const hasDraggedRef = useRef<boolean>(false);
  const isPickedUpRef = useRef<boolean>(false);
  isPickedUpRef.current = isPickedUp;
  const isDroppingRef = useRef<boolean>(false);
  isDroppingRef.current = isDropping;
  const lastDragPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastClickTimeRef = useRef<number>(0);

  // Synchronization refs for wander scheduler so it never triggers infinite 5s re-scheduling loops
  const posXRef = useRef(posX);
  posXRef.current = posX;

  const isSleepingRef = useRef(isSleeping);
  isSleepingRef.current = isSleeping;

  const isJumpingRef = useRef(isJumping);
  isJumpingRef.current = isJumping;

  const isPeekingRef = useRef(isPeeking);
  isPeekingRef.current = isPeeking;

  // Reading / scroll detection: stays completely motionless while visitor is reading
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const speechTimerRef = useRef<number | null>(null);
  const lastQuipRef = useRef<string | null>(null);
  const waddleTimerRef = useRef<number | null>(null);
  const blinkTimerRef = useRef<number | null>(null);
  const peekTimerRef = useRef<number | null>(null);

  // Detect active scrolling (reading mode)
  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 1500); // Resume 1.5s after scrolling stops
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const sayMessage = useCallback((text: string, durationMs = 5000) => {
    lastQuipRef.current = text;
    setSpeechText(text);
    if (speechTimerRef.current) {
      window.clearTimeout(speechTimerRef.current);
    }
    speechTimerRef.current = window.setTimeout(() => {
      setSpeechText(null);
    }, durationMs);
  }, []);

  const putToSleep = useCallback(() => {
    setIsSleeping(true);
    isSleepingRef.current = true;
    setIsWaddling(false);
    setIsPeeking(null);
    if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
    if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
    setSpeechText(null);
  }, []);

  const wakeUp = useCallback(
    (sayQuip = true) => {
      setIsSleeping(false);
      isSleepingRef.current = false;
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);

      // Re-arm auto-sleep inactivity timer
      if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = window.setTimeout(() => {
        if (!isFeedingRef.current && !isPickedUpRef.current && !isDroppingRef.current) {
          putToSleep();
        }
      }, 45000);

      if (sayQuip) {
        const wakeLine = WAKE_QUIPS[Math.floor(Math.random() * WAKE_QUIPS.length)];
        sayMessage(wakeLine, 3800);
      }
    },
    [putToSleep, sayMessage]
  );

  // Reset inactivity timer (45 seconds of total page inactivity -> sleep)
  const resetInactivity = useCallback(() => {
    if (inactivityTimerRef.current) {
      window.clearTimeout(inactivityTimerRef.current);
    }

    if (!isSleepingRef.current) {
      inactivityTimerRef.current = window.setTimeout(() => {
        if (!isFeedingRef.current && !isPickedUpRef.current && !isDroppingRef.current) {
          putToSleep();
        }
      }, 45000); // 45 seconds of inactivity -> peaceful nap
    }
  }, [putToSleep]);

  // Safe trigger click for quick clicks (jump + speech bubble)
  const safeTriggerClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 350) return;
    lastClickTimeRef.current = now;

    if (isSleepingRef.current) {
      wakeUp(true);
      return;
    }

    resetInactivity();

    if (isPeekingRef.current) {
      const stepBack = isPeekingRef.current === 'left' ? 16 : 82;
      setIsPeeking(null);
      if (peekTimerRef.current) window.clearTimeout(peekTimerRef.current);
      setMoveDuration(1200);
      setPosX(stepBack);
      setDirection(isPeekingRef.current === 'left' ? 1 : -1);
    }

    // Trigger jump physics
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 450);

    // Pick a personalized witty quip (route-aware + non-repeating)
    sayMessage(pickPersonalizedQuip(pathname, lastQuipRef.current), 5200);
  }, [pathname, resetInactivity, sayMessage, wakeUp]);

  // Execute drop physics with gravity acceleration down to baseline
  const executeDrop = useCallback(() => {
    setIsPickedUp(false);
    isPickedUpRef.current = false;

    const currentDragPos = lastDragPosRef.current;
    const currentBottom = Math.max(0, window.innerHeight - currentDragPos.y - 45);
    const clampedX = Math.max(40, Math.min(window.innerWidth - 40, currentDragPos.x));
    const newVw = Math.max(8, Math.min(92, (clampedX / window.innerWidth) * 100));

    // Naturally face inward toward website content
    setDirection(newVw > 50 ? -1 : 1);
    setDropPos({ x: clampedX, y: currentDragPos.y });

    if (currentBottom <= 20) {
      // Already at ground baseline
      setPosX(newVw);
      setIsLanding(true);
      setTimeout(() => {
        setIsLanding(false);
        hasDraggedRef.current = false;
      }, 400);
      return;
    }

    // Gravity fall from height
    isDroppingRef.current = true;
    setIsDropping(true);
    setDropBottom(currentBottom);
    setDropAnimating(false);

    // Fall duration proportional to sqrt of distance (realistic free-fall under gravity)
    const fallMs = Math.min(520, Math.max(180, Math.round(Math.sqrt(currentBottom) * 15)));
    setDropDuration(fallMs);

    // Trigger fall transition on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDropAnimating(true);
        setDropBottom(0);
      });
    });

    setTimeout(() => {
      setIsDropping(false);
      isDroppingRef.current = false;
      setDropAnimating(false);
      setPosX(newVw);
      setIsLanding(true);
      if (currentBottom > 120) {
        const dropLine = DROP_QUIPS[Math.floor(Math.random() * DROP_QUIPS.length)];
        sayMessage(dropLine, 3400);
      }
      setTimeout(() => {
        setIsLanding(false);
        hasDraggedRef.current = false;
      }, 400);
    }, fallMs + 30);
  }, [sayMessage]);

  const handleGopherMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only primary mouse button
    e.preventDefault();
    if (!isSleepingRef.current) {
      resetInactivity();
    }
    dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    hasDraggedRef.current = false;
    lastDragPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleGopherTouchStart = (e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    const touch = e.touches[0];
    if (!isSleepingRef.current) {
      resetInactivity();
    }
    dragStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    hasDraggedRef.current = false;
    lastDragPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  // Mouse tracking & Drag-Drop listeners
  useEffect(() => {
    if (isHidden) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isSleepingRef.current) {
        resetInactivity();
      }

      // Check if dragging Gopher
      if (dragStartRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        const dist = Math.hypot(dx, dy);

        if (!isPickedUpRef.current && (dist > 5 || (dist > 2 && Date.now() - dragStartRef.current.time > 150))) {
          isPickedUpRef.current = true;
          setIsPickedUp(true);
          hasDraggedRef.current = true;
          setIsWaddling(false);
          setIsPeeking(null);
          setIsSleeping(false);
          if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
          setSpeechText(null);
        }

        if (isPickedUpRef.current) {
          hasDraggedRef.current = true;
          const clampedX = Math.max(30, Math.min(window.innerWidth - 30, e.clientX));
          const clampedY = Math.max(30, Math.min(window.innerHeight - 30, e.clientY));
          setDragPos({ x: clampedX, y: clampedY });
          lastDragPosRef.current = { x: clampedX, y: clampedY };
          return; // Skip normal pupil tracking while dangling
        }
      }

      if (isSleepingRef.current || isPickedUpRef.current) return;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scaleX = rect.width / 752;
        const scaleY = rect.height / 1024;

        // Coordinates of eye centers in viewport space
        const leftEyeScreenX = rect.left + 263 * scaleX;
        const leftEyeScreenY = rect.top + 180 * scaleY;
        const rightEyeScreenX = rect.left + 482 * scaleX;
        const rightEyeScreenY = rect.top + 175 * scaleY;

        // Angle and bounded distance for left eye
        const dxL = e.clientX - leftEyeScreenX;
        const dyL = e.clientY - leftEyeScreenY;
        const angleL = Math.atan2(dyL, dxL);
        const distL = Math.min(28, Math.hypot(dxL, dyL) / 14);

        // Angle and bounded distance for right eye
        const dxR = e.clientX - rightEyeScreenX;
        const dyR = e.clientY - rightEyeScreenY;
        const angleR = Math.atan2(dyR, dxR);
        const distR = Math.min(28, Math.hypot(dxR, dyR) / 14);

        setLeftPupil({
          x: Math.cos(angleL) * distL,
          y: Math.sin(angleL) * distL,
        });
        setRightPupil({
          x: Math.cos(angleR) * distR,
          y: Math.sin(angleR) * distR,
        });
      }
    };

    const handleMouseUp = () => {
      if (dragStartRef.current) {
        const wasPickedUp = isPickedUpRef.current;
        const dragTime = Date.now() - dragStartRef.current.time;
        const didMove = hasDraggedRef.current;
        dragStartRef.current = null;

        if (wasPickedUp && didMove) {
          executeDrop();
        } else if (!didMove && dragTime < 350) {
          safeTriggerClick();
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragStartRef.current || !e.touches[0]) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.x;
      const dy = touch.clientY - dragStartRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (!isPickedUpRef.current && (dist > 6 || Date.now() - dragStartRef.current.time > 150)) {
        isPickedUpRef.current = true;
        setIsPickedUp(true);
        hasDraggedRef.current = true;
        setIsWaddling(false);
        setIsPeeking(null);
        setIsSleeping(false);
        if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
        setSpeechText(null);
      }

      if (isPickedUpRef.current) {
        if (e.cancelable) e.preventDefault();
        hasDraggedRef.current = true;
        const clampedX = Math.max(30, Math.min(window.innerWidth - 30, touch.clientX));
        const clampedY = Math.max(30, Math.min(window.innerHeight - 30, touch.clientY));
        setDragPos({ x: clampedX, y: clampedY });
        lastDragPosRef.current = { x: clampedX, y: clampedY };
      }
    };

    const handleTouchEnd = () => {
      if (dragStartRef.current) {
        const wasPickedUp = isPickedUpRef.current;
        const dragTime = Date.now() - dragStartRef.current.time;
        const didMove = hasDraggedRef.current;
        dragStartRef.current = null;

        if (wasPickedUp && didMove) {
          executeDrop();
        } else if (!didMove && dragTime < 350) {
          safeTriggerClick();
        }
      }
    };

    const handleUserInteraction = () => {
      if (!isSleepingRef.current) {
        resetInactivity();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousedown', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    resetInactivity();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivity, isHidden, executeDrop, safeTriggerClick]);

  // Double-click anywhere on the website to drop a snack!
  useEffect(() => {
    if (isHidden) return;

    const handleGlobalDoubleClick = (e: MouseEvent) => {
      // Don't trigger if double clicking inside text inputs or textareas, or if Gopher is picked up / dropping
      if (isPickedUpRef.current || isDroppingRef.current) {
        return;
      }

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (isSleepingRef.current) {
        wakeUp(false);
      } else {
        resetInactivity();
      }
      setIsPeeking(null);
      if (peekTimerRef.current) window.clearTimeout(peekTimerRef.current);

      // Dismiss speech bubble so it remains silent when snack is given
      setSpeechText(null);
      if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);

      const randomEmoji = SNACK_EMOJIS[Math.floor(Math.random() * SNACK_EMOJIS.length)];
      const targetVw = Math.max(10, Math.min(88, (e.clientX / window.innerWidth) * 100));

      const newSnack: SnackItem = {
        id: `snack-${Date.now()}-${Math.random()}`,
        emoji: randomEmoji,
        startX: e.clientX,
        startY: e.clientY,
        targetVw,
        isEaten: false,
        spawnTime: Date.now(),
      };

      setSnacks((prev) => [...prev, newSnack]);
      isFeedingRef.current = true;

      // Turn Gopher toward snack and rush over!
      const dir = targetVw > posX ? 1 : -1;
      setDirection(dir);
      setIsWaddling(true);

      // Travel time proportional to distance
      const distance = Math.abs(targetVw - posX);
      const walkTime = Math.max(1000, distance * 30);
      setMoveDuration(walkTime);
      setPosX(targetVw);

      // When Gopher reaches the snack
      setTimeout(() => {
        setIsWaddling(false);
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 450);

        // Mark snack as eaten
        setSnacks((prev) =>
          prev.map((s) => (s.id === newSnack.id ? { ...s, isEaten: true } : s))
        );

        // Remove from list after eat animation
        setTimeout(() => {
          setSnacks((prev) => prev.filter((s) => s.id !== newSnack.id));
          isFeedingRef.current = false;
        }, 500);

        // Per user request: "also don't say anything when a snack is given"
        // Gopher eats silently with jump + nom! animation, no speech bubble
      }, walkTime + 200);
    };

    window.addEventListener('dblclick', handleGlobalDoubleClick);
    return () => {
      window.removeEventListener('dblclick', handleGlobalDoubleClick);
    };
  }, [posX, resetInactivity, isHidden, wakeUp]);

  // Periodic blinking (every 3.5 to 6 seconds)
  useEffect(() => {
    if (isHidden) return;

    const triggerBlink = () => {
      if (!isSleeping) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 170);
      }
      const nextDelay = 3500 + Math.random() * 3000;
      blinkTimerRef.current = window.setTimeout(triggerBlink, nextDelay);
    };

    blinkTimerRef.current = window.setTimeout(triggerBlink, 3500);
    return () => {
      if (blinkTimerRef.current) window.clearTimeout(blinkTimerRef.current);
    };
  }, [isSleeping, isHidden]);

  // Random waddling and occasional peeking behavior: smooth, deliberate, infrequent strolls
  useEffect(() => {
    if (isHidden) return;

    let isMounted = true;

    const wander = () => {
      if (!isMounted) return;

      // If visitor is actively scrolling, wait briefly and retry
      if (isScrollingRef.current) {
        waddleTimerRef.current = window.setTimeout(wander, 3000);
        return;
      }

      const currentPosX = posXRef.current;
      const sleeping = isSleepingRef.current;
      const jumping = isJumpingRef.current;
      const peeking = isPeekingRef.current;
      const feeding = isFeedingRef.current;
      const pickedUp = isPickedUpRef.current;
      const dropping = isDroppingRef.current;

      if (!sleeping && !jumping && !feeding && !pickedUp && !dropping) {
        // If currently peeking, smoothly step back onto the main screen
        if (peeking) {
          setIsPeeking(null);
          const safeTarget = peeking === 'left' ? 24 + Math.random() * 12 : 64 + Math.random() * 12;
          const newDir = safeTarget > currentPosX ? 1 : -1;
          setDirection(newDir);
          setIsWaddling(true);
          const duration = 2600;
          setMoveDuration(duration);
          setPosX(safeTarget);

          setTimeout(() => {
            if (!isFeedingRef.current && isMounted) setIsWaddling(false);
          }, duration);

          // Rest for 22 to 34 seconds after stepping back
          const nextDelay = 22000 + Math.random() * 12000;
          waddleTimerRef.current = window.setTimeout(wander, nextDelay);
          return;
        }

        // ~18% chance to peek from the edge of the screen
        const shouldPeek = Math.random() < 0.18;
        if (shouldPeek) {
          const targetSide: 'left' | 'right' = currentPosX < 50 ? 'left' : 'right';
          const targetVw = targetSide === 'left' ? 0 : 100;
          const walkDir = targetSide === 'left' ? -1 : 1;

          setDirection(walkDir);
          setIsWaddling(true);
          const distance = Math.abs(targetVw - currentPosX);
          const walkDuration = Math.max(2600, distance * 65);
          setMoveDuration(walkDuration);
          setPosX(targetVw);

          peekTimerRef.current = window.setTimeout(() => {
            if (!isFeedingRef.current && isMounted) {
              setIsWaddling(false);
              setIsPeeking(targetSide);
              setDirection(targetSide === 'left' ? 1 : -1);
            }
          }, walkDuration);

          // Stay peeking for 5 seconds, then wander back
          const peekWait = walkDuration + 5000;
          waddleTimerRef.current = window.setTimeout(wander, peekWait);
          return;
        }

        // Standard smooth walk: pick a meaningful destination across the bottom
        // Ensure distance is at least 18vw so it's a real, graceful stroll
        let target = 16 + Math.random() * 68;
        if (Math.abs(target - currentPosX) < 18) {
          target = currentPosX > 50
            ? currentPosX - (20 + Math.random() * 25)
            : currentPosX + (20 + Math.random() * 25);
        }
        target = Math.max(12, Math.min(88, target));

        const distance = Math.abs(target - currentPosX);
        const newDir = target > currentPosX ? 1 : -1;
        setDirection(newDir);
        setIsWaddling(true);

        // Smooth, relaxed walking speed: ~70ms per vw (min 2600ms)
        const walkDuration = Math.max(2600, distance * 70);
        setMoveDuration(walkDuration);
        setPosX(target);

        setTimeout(() => {
          if (!isFeedingRef.current && isMounted) {
            setIsWaddling(false);
          }
        }, walkDuration);
      }

      // Infrequent, comfortable pause between strolls: 22 to 34 seconds
      const nextWanderDelay = 22000 + Math.random() * 12000;
      waddleTimerRef.current = window.setTimeout(wander, nextWanderDelay);
    };

    // First stroll starts after 10 seconds of peaceful idling
    waddleTimerRef.current = window.setTimeout(wander, 10000);
    return () => {
      isMounted = false;
      if (waddleTimerRef.current) window.clearTimeout(waddleTimerRef.current);
      if (peekTimerRef.current) window.clearTimeout(peekTimerRef.current);
    };
  }, [isHidden]);

  // Click handler: Jump + random speech bubble for 3 seconds (unless dragging/dropped)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    safeTriggerClick();
  };

  // If visitor hid the pet, show a subtle non-intrusive corner toggle
  if (isHidden) {
    return (
      <button
        type="button"
        onClick={() => {
          setIsHidden(false);
          try {
            localStorage.removeItem('gopher_pet_hidden');
          } catch {}
        }}
        title="Show Go Gopher Pet"
        className="fixed bottom-3 right-3 z-40 px-2.5 py-1 bg-white/90 dark:bg-[#0E1F27]/90 hover:bg-white dark:hover:bg-[#132A36] border border-gray-200 dark:border-gray-700/80 text-gray-500 hover:text-[#00ADD8] dark:text-gray-400 dark:hover:text-[#7FDCF3] text-xs rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5 opacity-60 hover:opacity-100 font-mono text-[11px]"
      >
        <span>🐹</span>
        <span>pet</span>
      </button>
    );
  }

  return (
    <>
      <style>{`
        @keyframes gopher-breathe {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.015) scaleX(0.99) translateY(-1px); }
        }

        @keyframes gopher-waddle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2.5deg) translateY(-1px); }
          75% { transform: rotate(2.5deg) translateY(-1px); }
        }

        @keyframes gopher-jump {
          0% { transform: translateY(0) scale(1, 1); }
          25% { transform: translateY(-20px) scale(0.93, 1.1); }
          55% { transform: translateY(-16px) scale(1.03, 0.97); }
          80% { transform: translateY(0) scale(1.05, 0.95); }
          100% { transform: translateY(0) scale(1, 1); }
        }

        @keyframes float-zzz {
          0% { opacity: 0; transform: translate(0, 0) scale(0.7); }
          30% { opacity: 0.7; transform: translate(8px, -12px) scale(0.95); }
          70% { opacity: 0.6; transform: translate(-5px, -24px) scale(1.1); }
          100% { opacity: 0; transform: translate(6px, -38px) scale(1.2); }
        }

        @keyframes snack-fall {
          0% {
            transform: translate(var(--start-x), var(--start-y)) scale(1.3);
            opacity: 1;
          }
          65% {
            transform: translate(var(--target-x), calc(100vh - 28px)) scale(1);
            opacity: 1;
          }
          80% {
            transform: translate(var(--target-x), calc(100vh - 38px)) scale(1.08);
            opacity: 1;
          }
          100% {
            transform: translate(var(--target-x), calc(100vh - 24px)) scale(1);
            opacity: 1;
          }
        }

        @keyframes snack-eaten {
          0% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.4) rotate(15deg); opacity: 0.9; }
          100% { transform: scale(0) rotate(-20deg); opacity: 0; }
        }

        .gopher-breathe-anim {
          animation: gopher-breathe 4s ease-in-out infinite;
          transform-origin: bottom center;
        }

        @keyframes gopher-waddle {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(-3deg) translateY(-2px); }
          50% { transform: rotate(0deg) translateY(0); }
          75% { transform: rotate(3deg) translateY(-2px); }
        }

        .gopher-waddle-anim {
          animation: gopher-waddle 0.44s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .gopher-jump-anim {
          animation: gopher-jump 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          transform-origin: bottom center;
        }

        .zzz-1 { animation: float-zzz 2.5s ease-out infinite; }
        .zzz-2 { animation: float-zzz 2.5s ease-out 0.8s infinite; }
        .zzz-3 { animation: float-zzz 2.5s ease-out 1.6s infinite; }

        .snack-falling {
          animation: snack-fall 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .snack-pop-eaten {
          animation: snack-eaten 0.45s ease-out forwards;
        }

        @keyframes gopher-peek-left {
          0%, 100% { transform: scaleX(1) rotate(5deg) translateY(0); }
          50% { transform: scaleX(1) rotate(7deg) translateY(-1.5px); }
        }

        @keyframes gopher-peek-right {
          0%, 100% { transform: scaleX(-1) rotate(-5deg) translateY(0); }
          50% { transform: scaleX(-1) rotate(-7deg) translateY(-1.5px); }
        }

        .gopher-peek-left-anim {
          animation: gopher-peek-left 3.2s ease-in-out infinite;
          transform-origin: bottom left;
        }

        .gopher-peek-right-anim {
          animation: gopher-peek-right 3.2s ease-in-out infinite;
          transform-origin: bottom right;
        }

        @keyframes gopher-picked-sway {
          0%, 100% { transform: rotate(-4deg) translateY(-2px); }
          50% { transform: rotate(4deg) translateY(2px); }
        }

        @keyframes gopher-feet-dangle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg) translateY(-3px); }
          75% { transform: rotate(10deg) translateY(-1px); }
        }

        @keyframes gopher-hands-dangle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-12deg) translateY(-3px); }
        }

        @keyframes gopher-landing-squash {
          0% { transform: scale(1, 1) translateY(0); }
          25% { transform: scale(1.26, 0.74) translateY(3px); }
          55% { transform: scale(0.92, 1.08) translateY(-7px); }
          80% { transform: scale(1.04, 0.96) translateY(0); }
          100% { transform: scale(1, 1) translateY(0); }
        }

        .gopher-picked-anim {
          animation: gopher-picked-sway 0.75s ease-in-out infinite;
          transform-origin: 50% 15%;
        }

        .gopher-landing-anim {
          animation: gopher-landing-squash 0.38s ease-out;
          transform-origin: bottom center;
        }
      `}</style>

      {/* Falling & Ground Snacks */}
      {snacks.map((snack) => (
        <div
          key={snack.id}
          className={`fixed z-30 pointer-events-none select-none text-2xl drop-shadow-md ${
            snack.isEaten ? 'snack-pop-eaten' : 'snack-falling'
          }`}
          style={
            {
              '--start-x': `${snack.startX}px`,
              '--start-y': `${snack.startY}px`,
              '--target-x': `${snack.targetVw}vw`,
              left: 0,
              top: 0,
            } as React.CSSProperties
          }
        >
          <span>{snack.emoji}</span>
          {snack.isEaten && (
            <span className="absolute -top-4 -left-2 text-xs font-mono font-bold text-amber-500 animate-ping">
              ✨nom!
            </span>
          )}
        </div>
      ))}

      {/* Viewport Overlay Container that safely clips edge-peeking without breaking html/body sticky scrolling */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        {/* Dynamic Ground Shadow when Picked Up or Dropping */}
        {(isPickedUp || isDropping) && (
          <div
            className="hidden sm:block absolute bottom-1 pointer-events-none -translate-x-1/2"
            style={{
              left: isPickedUp ? `${dragPos.x}px` : `${dropPos.x}px`,
              width: `${Math.round(52 * Math.max(0.25, 1 - Math.min(1, (isPickedUp ? Math.max(0, window.innerHeight - dragPos.y - 45) : dropBottom) / 450) * 0.72))}px`,
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.32)',
              filter: `blur(${Math.round(1.5 + Math.min(1, (isPickedUp ? Math.max(0, window.innerHeight - dragPos.y - 45) : dropBottom) / 450) * 5)}px)`,
              opacity: Math.max(0.08, 0.45 - Math.min(1, (isPickedUp ? Math.max(0, window.innerHeight - dragPos.y - 45) : dropBottom) / 450) * 0.35),
              transition: isDropping ? `all ${dropDuration}ms cubic-bezier(0.5, 0.05, 0.8, 0.35)` : 'none',
            }}
          />
        )}

        {/* Gopher Pet Bottom Layer (Hidden on mobile phones to protect small screens) */}
        <div
          className="hidden sm:block absolute pointer-events-none select-none"
          style={{
            left: isPickedUp
              ? `${dragPos.x}px`
              : isDropping
              ? `${dropPos.x}px`
              : isPeeking === 'left'
              ? '0vw'
              : isPeeking === 'right'
              ? '100vw'
              : `${posX}vw`,
            bottom: isPickedUp
              ? `${Math.max(0, window.innerHeight - dragPos.y - 45)}px`
              : isDropping
              ? `${dropBottom}px`
              : '0px',
            transform:
              isPickedUp || isDropping
                ? 'translateX(-50%)'
                : isPeeking === 'left'
                ? 'translateX(-45%)'
                : isPeeking === 'right'
                ? 'translateX(-55%)'
                : 'translateX(-50%)',
            transition: isPickedUp
              ? 'none'
              : isDropping
              ? dropAnimating
                ? `bottom ${dropDuration}ms cubic-bezier(0.5, 0.05, 0.8, 0.35)`
                : 'none'
              : `left ${moveDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1.0), transform 0.4s ease-out`,
          }}
        >
        {/* Snooze & Hide Quick Controls (Visible on hover when not peeking/talking/dragging) */}
        {!isPeeking && !speechText && !isPickedUp && !isDropping && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-200 pointer-events-auto z-50">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isSleeping) {
                  wakeUp(true);
                } else {
                  putToSleep();
                }
              }}
              title={isSleeping ? "Wake up Gopher" : "Put Gopher to sleep (quiet mode)"}
              className="px-1.5 py-0.5 text-[9px] font-mono bg-white/95 dark:bg-[#0E1F27]/95 text-gray-500 hover:text-[#00ADD8] dark:text-gray-400 border border-gray-200 dark:border-gray-700/80 rounded shadow-sm hover:shadow transition-colors"
            >
              {isSleeping ? '☀️ wake' : '💤 sleep'}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsHidden(true);
                try {
                  localStorage.setItem('gopher_pet_hidden', 'true');
                } catch {}
              }}
              title="Hide Gopher pet"
              className="px-1.5 py-0.5 text-[9px] font-mono bg-white/95 dark:bg-[#0E1F27]/95 text-gray-400 hover:text-red-500 border border-gray-200 dark:border-gray-700/80 rounded shadow-sm hover:shadow transition-colors"
            >
              ✕ hide
            </button>
          </div>
        )}

        {/* Speech Bubble (Cleanly Anchored Above Ears & Clamped Near Edges) */}
        {speechText && !isSleeping && !isPickedUp && !isDropping && (
          <div
            role="status"
            aria-live="polite"
            className={`absolute bottom-full mb-2.5 w-56 sm:w-64 max-w-[calc(100vw-24px)] px-3 py-2 bg-white dark:bg-[#0E1F27] text-[#101820] dark:text-[#E6F4F8] border border-[#101820] dark:border-[#00ADD8] rounded-xl shadow-lg pointer-events-auto text-[11.5px] font-medium text-center z-50 animate-in fade-in zoom-in-90 duration-150 leading-snug ${
              isPeeking === 'left'
                ? 'left-4 sm:left-6'
                : isPeeking === 'right'
                ? 'right-10 sm:right-12'
                : posX > 76
                ? 'right-0'
                : posX < 24
                ? 'left-0'
                : 'left-1/2 -translate-x-1/2'
            }`}
          >
            <span>{speechText}</span>
            {/* Bubble Arrow */}
            <div
              className={`absolute -bottom-2 w-0 h-0 border-x-5 border-x-transparent border-t-6 border-t-[#101820] dark:border-t-[#00ADD8] ${
                isPeeking === 'left'
                  ? 'left-5 sm:left-7'
                  : isPeeking === 'right'
                  ? 'right-5 sm:right-7'
                  : posX > 76
                  ? 'right-6'
                  : posX < 24
                  ? 'left-6'
                  : 'left-1/2 -translate-x-1/2'
              }`}
            />
            <div
              className={`absolute -bottom-1.5 w-0 h-0 border-x-4 border-x-transparent border-t-5 border-t-white dark:border-t-[#0E1F27] ${
                isPeeking === 'left'
                  ? 'left-5 sm:left-7'
                  : isPeeking === 'right'
                  ? 'right-5 sm:right-7'
                  : posX > 76
                  ? 'right-6'
                  : posX < 24
                  ? 'left-6'
                  : 'left-1/2 -translate-x-1/2'
              }`}
            />
          </div>
        )}

        {/* Floating Sleeping 'Zzz' (Proportionally Scaled & Subtle) */}
        {isSleeping && (
          <div
            className={`absolute -top-8 opacity-60 font-mono font-bold select-none pointer-events-none z-50 ${
              isPeeking === 'left' ? 'left-6' : isPeeking === 'right' ? '-left-6' : 'left-6'
            }`}
          >
            <span className="absolute text-[#00ADD8] text-[10px] zzz-1">Z</span>
            <span className="absolute text-[#00708C] dark:text-[#7FDCF3] text-[11px] zzz-2">z</span>
            <span className="absolute text-[#101820] dark:text-white text-xs zzz-3">z</span>
          </div>
        )}

        {/* Gopher Pet Interactive Container (Subtle Opacity to Reduce Visual Distraction) */}
        <div
          ref={containerRef}
          onClick={handleClick}
          onMouseDown={handleGopherMouseDown}
          onTouchStart={handleGopherTouchStart}
          title={
            isPickedUp
              ? "Drop me anywhere on the ground!"
              : isSleeping
              ? "Gopher is sleeping... click to wake up!"
              : isPeeking
              ? "Peek-a-boo! Drag me or click me to play!"
              : "Click to jump, or click & drag to pick me up!"
          }
          aria-label="Interactive Go Gopher Pet"
          className={`group relative w-14 sm:w-16 select-none pointer-events-auto ${
            isPickedUp
              ? 'cursor-grabbing gopher-picked-anim opacity-100 z-50'
              : isDropping
              ? 'cursor-grabbing opacity-100'
              : isLanding
              ? 'gopher-landing-anim opacity-100'
              : isJumping
              ? 'gopher-jump-anim opacity-100'
              : isWaddling
              ? 'gopher-waddle-anim opacity-95'
              : isSleeping
              ? 'opacity-50 dark:opacity-45 hover:opacity-100 cursor-pointer'
              : 'opacity-80 dark:opacity-75 hover:opacity-100 cursor-grab active:cursor-grabbing'
          } ${
            isPeeking === 'left'
              ? 'gopher-peek-left-anim'
              : isPeeking === 'right'
              ? 'gopher-peek-right-anim'
              : isSleeping || isPickedUp || isDropping || isLanding
              ? ''
              : 'gopher-breathe-anim'
          }`}
          style={{
            transform: isPeeking ? undefined : `scaleX(${direction})`,
            transition: isPickedUp ? 'none' : 'transform 0.35s ease-out, opacity 0.3s ease-out',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 752 1024"
            className="w-full h-auto drop-shadow-md"
            aria-hidden="true"
          >
            {/* Separate Group: Ears */}
            <g id="ears">
              {/* Left ear */}
              <path
                d="M 125,75 C 60,60 25,100 35,160 C 45,200 95,190 125,160 Z"
                fill="#6AD7E5"
                stroke="#000000"
                strokeWidth="12"
                strokeLinejoin="round"
              />
              <ellipse
                cx="78"
                cy="135"
                rx="26"
                ry="20"
                transform="rotate(-25 78 135)"
                fill="#000000"
              />

              {/* Right ear */}
              <path
                d="M 627,75 C 692,60 727,100 717,160 C 707,200 657,190 627,160 Z"
                fill="#6AD7E5"
                stroke="#000000"
                strokeWidth="12"
                strokeLinejoin="round"
              />
              <ellipse
                cx="674"
                cy="135"
                rx="26"
                ry="20"
                transform="rotate(25 674 135)"
                fill="#000000"
              />
            </g>

            {/* Separate Group: Feet */}
            <g
              id="feet"
              style={{
                transformOrigin: '376px 920px',
                animation: isPickedUp ? 'gopher-feet-dangle 0.35s ease-in-out infinite' : undefined,
              }}
            >
              {/* Left foot */}
              <path
                d="M 130,925 C 95,950 82,975 92,1005 C 100,1020 135,1020 160,995 C 185,970 195,945 185,920 Z"
                fill="#F6D2A2"
                stroke="#000000"
                strokeWidth="10"
              />
              <path
                d="M 115,980 Q 120,1002 128,1012"
                stroke="#000000"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />

              {/* Right foot */}
              <path
                d="M 622,925 C 657,950 670,975 660,1005 C 652,1020 617,1020 592,995 C 567,970 557,945 567,920 Z"
                fill="#F6D2A2"
                stroke="#000000"
                strokeWidth="10"
              />
              <path
                d="M 637,980 Q 632,1002 624,1012"
                stroke="#000000"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Separate Group: Hands */}
            <g
              id="hands"
              style={{
                transformOrigin: '376px 540px',
                animation: isPickedUp ? 'gopher-hands-dangle 0.4s ease-in-out infinite' : undefined,
              }}
            >
              {/* Left hand */}
              <path
                d="M 72,505 C 25,510 3,530 4,550 C 5,568 28,575 72,565 Z"
                fill="#F6D2A2"
                stroke="#000000"
                strokeWidth="10"
                strokeLinejoin="round"
              />
              {/* Right hand */}
              <path
                d="M 680,505 C 727,510 749,530 748,550 C 747,568 724,575 680,565 Z"
                fill="#F6D2A2"
                stroke="#000000"
                strokeWidth="10"
                strokeLinejoin="round"
              />
            </g>

            {/* Separate Group: Body */}
            <g id="body">
              <path
                d="M 376,8 C 220,8 65,45 65,220 L 65,750 C 65,920 195,998 376,998 C 557,998 687,920 687,750 L 687,220 C 687,45 532,8 376,8 Z"
                fill="#6AD7E5"
                stroke="#000000"
                strokeWidth="13"
                strokeLinejoin="round"
              />
            </g>

            {/* Separate Group: Teeth */}
            <g id="teeth">
              <path
                d="M 326,290 L 326,346 C 326,358 335,360 348,360 C 356,360 360,356 360,346 L 360,290 Z"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="9"
                strokeLinejoin="round"
              />
              <path
                d="M 364,290 L 364,346 C 364,356 368,360 376,360 C 389,360 398,358 398,346 L 398,290 Z"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="9"
                strokeLinejoin="round"
              />
            </g>

            {/* Snout */}
            <g id="snout">
              <path
                d="M 376,240 C 330,240 298,255 298,280 C 298,304 335,310 362,302 C 370,300 376,296 376,296 C 376,296 382,300 390,302 C 417,310 454,304 454,280 C 454,255 422,240 376,240 Z"
                fill="#F6D2A2"
                stroke="#000000"
                strokeWidth="10"
                strokeLinejoin="round"
              />
            </g>

            {/* Nose */}
            <ellipse cx="376" cy="226" rx="42" ry="26" fill="#000000" />

            {/* Eyes Group (with Blink & Sleep transitions) */}
            <g id="eyes">
              {isSleeping ? (
                // Sleeping eyes: cute closed curved arcs
                <g id="sleeping-eyes">
                  <path
                    d="M 195,190 Q 263,225 330,190"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 415,190 Q 482,225 550,190"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </g>
              ) : (
                // Open eyes with blink transformation
                <g
                  style={{
                    transformOrigin: '376px 180px',
                    transform: isBlinking ? 'scaleY(0.08)' : 'scaleY(1)',
                    transition: 'transform 0.08s ease-in-out',
                  }}
                >
                  {/* White eye balls */}
                  <ellipse
                    cx="263"
                    cy="180"
                    rx="108"
                    ry="110"
                    fill="#FFFFFF"
                    stroke="#000000"
                    strokeWidth="12"
                  />
                  <ellipse
                    cx="482"
                    cy="175"
                    rx="108"
                    ry="110"
                    fill="#FFFFFF"
                    stroke="#000000"
                    strokeWidth="12"
                  />

                  {/* Separate Group: Left Pupil with cursor tracking (larger iconic Go Gopher eyes) */}
                  <g
                    id="left-pupil"
                    style={{
                      transform: isPickedUp
                        ? 'translate(263px, 202px)'
                        : `translate(${263 + leftPupil.x}px, ${180 + leftPupil.y}px)`,
                      transition: 'transform 0.08s ease-out',
                    }}
                  >
                    <circle cx="0" cy="0" r="42" fill="#000000" />
                    <circle cx="-12" cy="-12" r="11" fill="#FFFFFF" />
                    <circle cx="14" cy="14" r="4.5" fill="#FFFFFF" opacity="0.8" />
                  </g>

                  {/* Separate Group: Right Pupil with cursor tracking */}
                  <g
                    id="right-pupil"
                    style={{
                      transform: isPickedUp
                        ? 'translate(482px, 197px)'
                        : `translate(${482 + rightPupil.x}px, ${175 + rightPupil.y}px)`,
                      transition: 'transform 0.08s ease-out',
                    }}
                  >
                    <circle cx="0" cy="0" r="42" fill="#000000" />
                    <circle cx="-12" cy="-12" r="11" fill="#FFFFFF" />
                    <circle cx="14" cy="14" r="4.5" fill="#FFFFFF" opacity="0.8" />
                  </g>
                </g>
              )}
            </g>
          </svg>
        </div>
      </div>
    </div>
  </>
);
};
