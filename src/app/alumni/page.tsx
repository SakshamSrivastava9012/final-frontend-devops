'use client';

import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Briefcase, 
  MapPin, 
  Award,
  GraduationCap,
  Terminal,
  Cpu,
  Shield,
  Layers
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const alumni = [
  {
    name: 'Sarah Chen',
    role: 'Senior SRE @ Google',
    class: 'Class of 2021',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    location: 'Mountain View, CA',
    bio: 'Pioneer of the first automated deployment pipeline for the club. Now scaling global infrastructure.',
    links: { github: '#', linkedin: '#', twitter: '#' }
  },
  {
    name: 'Marcus Thorne',
    role: 'Cloud Architect @ AWS',
    class: 'Class of 2020',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: 'Seattle, WA',
    bio: 'Former Club President. AWS Community Builder and infrastructure optimization expert.',
    links: { github: '#', linkedin: '#', twitter: '#' }
  },
  {
    name: 'Elena Rodriguez',
    role: 'DevSecOps Lead @ Stripe',
    class: 'Class of 2022',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    location: 'San Francisco, CA',
    bio: 'Security enthusiast who integrated automated vulnerability scanning into our core projects.',
    links: { github: '#', linkedin: '#', twitter: '#' }
  },
  {
    name: 'David Kim',
    role: 'Platform Engineer @ Netflix',
    class: 'Class of 2021',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    location: 'Los Gatos, CA',
    bio: 'Master of container orchestration and chaos engineering experiments at the club.',
    links: { github: '#', linkedin: '#', twitter: '#' }
  },
  {
    name: 'Aisha Jallow',
    role: 'Infrastructure Engineer @ Vercel',
    class: 'Class of 2023',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    location: 'Remote',
    bio: 'The architect behind our current club platform\'s edge delivery network.',
    links: { github: '#', linkedin: '#', twitter: '#' }
  },
  {
    name: 'James Wilson',
    role: 'DevOps Manager @ HashiCorp',
    class: 'Class of 2019',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    location: 'Austin, TX',
    bio: 'Infrastructure as Code evangelist. If it isn\'t in Terraform, it doesn\'t exist.',
    links: { github: '#', linkedin: '#', twitter: '#' }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AlumniPage() {
  return (
    <AppLayout>
      <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <GraduationCap className="w-3 h-3" />
              Legacy of Excellence // Unit Alumni
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-black mb-6 tracking-tighter"
            >
              The <span className="neon-text-blue">Architects</span> <br />
              Of Our Infrastructure
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Meet the elite operators who built the foundation of DevOps Club. 
              Our alumni now lead infrastructure at the world's most innovative tech giants.
            </motion.p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {alumni.map((person, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass-dark p-8 rounded-[40px] border border-white/5 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="flex items-start justify-between mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-700" />
                    <Avatar className="h-24 w-24 border-2 border-white/10 relative z-10 group-hover:border-primary/50 transition-all duration-500 p-1 bg-background">
                      <AvatarImage src={person.image} className="rounded-full object-cover" />
                      <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex gap-2">
                    {[Twitter, Linkedin, Github].map((Icon, idx) => (
                      <motion.a
                        key={idx}
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-black group-hover:text-primary transition-colors tracking-tight">{person.name}</h3>
                    <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest mt-1">
                      <Briefcase className="w-3 h-3" />
                      {person.role}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass">
                      <Award className="w-3 h-3 text-secondary" />
                      {person.class}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass">
                      <MapPin className="w-3 h-3 text-accent" />
                      {person.location}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                    "{person.bio}"
                  </p>

                  <div className="pt-6 border-t border-white/5">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-all group/btn">
                      Access Dossier
                      <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-16 glass-dark rounded-[56px] border border-white/5 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Are you a <span className="text-primary">Legacy Operator?</span></h2>
              <p className="text-muted-foreground mb-12 max-w-xl mx-auto text-lg leading-relaxed">
                We'd love to hear about your journey after the unit. 
                Join our elite alumni network and help mentor the next wave of engineers.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="px-10 py-5 bg-primary text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-primary/20">
                  Join Alumni Unit
                </button>
                <button className="px-10 py-5 glass text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/5 hover:scale-105 transition-all">
                  Become Mentor
                </button>
              </div>
            </div>
            
            {/* Decorative icons */}
            <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none">
              <Terminal className="w-32 h-32" />
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
