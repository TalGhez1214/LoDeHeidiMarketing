import { motion } from 'motion/react';
import { useState } from 'react';
import { VideoTile } from '../VideoTile';
import { Dialog, DialogContent } from '../ui/dialog';
import { X } from 'lucide-react';

export function Demos() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const videos = [
    {
      title: '',
      description: '',
      thumbnail: 'https://images.unsplash.com/photo-1758598305216-b8cf416cb5b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MDI3MTM4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    // {
    //   title: 'Summary Modal',
    //   description: 'Generate comprehensive summaries with key takeaways in seconds',
    //   thumbnail: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYwMzM2NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    // },
    // {
    //   title: 'Article Finder',
    //   description: 'Discover related content with intelligent recommendations and context',
    //   thumbnail: 'https://images.unsplash.com/photo-1738073954103-1e0417112fd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnRpY2xlJTIwcmVhZGVyfGVufDF8fHx8MTc2MDM2NDUxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    // },
    // {
    //   title: 'Highlight',
    //   description: 'Engage readers with real-time AI-powered highlighting in your content',
    //   thumbnail: 'https://images.unsplash.com/photo-1758598305216-b8cf416cb5b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MDI3MTM4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    // },
  ];

  return (
    <section id="demos" className="py-20 md:py-32 bg-gradient-to-b from-pink-50/30 to-red-50/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">
            See it in action
          </h2>
          {/* <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how Noah AI transforms the reading experience for your audience
          </p> */}
        </motion.div>

        {/* Vertical layout with larger videos */}
        <div className="max-w-4xl mx-auto space-y-12">
          {videos.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="space-y-4"
            >
              {/* Description on top */}
              {/* <div className="text-center">
                <h3 className="mb-2">{video.title}</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">{video.description}</p>
              </div> */}
              {/* Video tile - larger */}
              <VideoTile
                title={video.title}
                thumbnail={video.thumbnail}
                onClick={() => setSelectedVideo(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={selectedVideo !== null} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl p-0">
          <div className="relative aspect-video bg-black rounded-lg">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              {selectedVideo !== null && (
                <div className="text-center px-8">
                  <p className="text-2xl mb-3">Video Demo: {videos[selectedVideo].title}</p>
                  <p className="text-white/80">{videos[selectedVideo].description}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}