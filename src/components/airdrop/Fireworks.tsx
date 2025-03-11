import { useEffect, useState } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    hue: number;
    alpha: number;
    size: number;
}

const Fireworks = ({ onComplete }: { onComplete: () => void }) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    
    useEffect(() => {
        // Create initial explosion
        createExplosion();
        
        // Set a timer to auto-dismiss
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);
        
        // Animation frame loop
        let animationId: number;
        const animate = () => {
            updateParticles();
            animationId = requestAnimationFrame(animate);
        };
        
        animationId = requestAnimationFrame(animate);
        
        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timer);
        };
    }, [onComplete]);
    
    const createExplosion = () => {
        const newParticles: Particle[] = [];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Create multiple explosions
        for (let i = 0; i < 10; i++) {
            const offsetX = (Math.random() - 0.5) * 200;
            const offsetY = (Math.random() - 0.5) * 200;
            const hue = Math.random() * 360;
            
            // Create particles for each explosion
            for (let j = 0; j < 50; j++) {
                const angle = Math.random() * Math.PI * 10;
                const speed = 1 + Math.random() * 5;
                
                newParticles.push({
                    x: centerX + offsetX,
                    y: centerY + offsetY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    hue: hue + Math.random() * 30,
                    alpha: 1,
                    size: 2 + Math.random() * 4
                });
            }
        }
        
        setParticles(newParticles);
    };
    
    const updateParticles = () => {
        setParticles(prevParticles => 
            prevParticles
                .map(p => ({
                    ...p,
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    vy: p.vy + 0.05, // Gravity
                    alpha: p.alpha - 0.01,
                    size: Math.max(0, p.size - 0.05)
                }))
                .filter(p => p.alpha > 0)
        );
    };
    
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9999
        }}>
            {particles.map((p, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        backgroundColor: `hsla(${p.hue}, 100%, 50%, ${p.alpha})`,
                        boxShadow: `0 0 ${p.size * 2}px hsla(${p.hue}, 100%, 50%, ${p.alpha})`,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            ))}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '15px 30px',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '24px',
                textAlign: 'center'
            }}>
                Successfully registered for the airdrop!
            </div>
        </div>
    );
};

export default Fireworks;