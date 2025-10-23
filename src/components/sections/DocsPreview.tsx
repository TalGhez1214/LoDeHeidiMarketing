import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CodeBlock } from '../CodeBlock';
import { Book, Code, Palette, Zap } from 'lucide-react';

export function DocsPreview() {
  const scriptExample = `<!-- Add to your HTML -->
<script src="https://cdn.noah-ai.example/noah.js"></script>
<script>
  Noah.init({
    apiKey: 'YOUR_API_KEY',
    theme: 'dark'
  });
</script>`;

  const reactExample = `import { NoahProvider, useNoah } from '@noah-ai/react';

function App() {
  return (
    <NoahProvider apiKey="YOUR_API_KEY">
      <Article />
    </NoahProvider>
  );
}

function Article() {
  const { highlight, summarize } = useNoah();
  
  return (
    <div className="article">
      <p onClick={() => highlight('key-sentence')}>
        Your content here...
      </p>
    </div>
  );
}`;

  const fastapiExample = `from fastapi import FastAPI
from noah_ai import NoahBackend

app = FastAPI()
noah = NoahBackend(
    api_key="YOUR_API_KEY",
    content_source="mongodb://..."
)

@app.post("/api/noah/query")
async def query(request: QueryRequest):
    response = await noah.answer(
        question=request.question,
        context=request.article_id
    )
    return response`;

  const themingExample = `{
  "colors": {
    "primary": "#5B8CFF",
    "accent": "#8B5CF6",
    "background": "#0B1220"
  },
  "components": {
    "orb": {
      "position": "bottom-right",
      "size": "medium"
    },
    "chat": {
      "maxWidth": "600px",
      "streaming": true
    }
  }
}`;

  const sections = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Quickstart',
      description: 'Get up and running in minutes with our simple script tag',
      code: scriptExample,
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: 'React Integration',
      description: 'Use our React hooks for deeper integration',
      code: reactExample,
    },
    {
      icon: <Book className="w-5 h-5" />,
      title: 'Backend Setup',
      description: 'Configure your FastAPI backend for content processing',
      code: fastapiExample,
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: 'Theming',
      description: 'Customize the appearance to match your brand',
      code: themingExample,
    },
  ];

  return (
    <section id="docs" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">
            Developer-friendly documentation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to integrate Noah AI into your platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {sections.map((section, index) => (
                <TabsTrigger key={index} value={index.toString()} className="gap-2">
                  {section.icon}
                  <span className="hidden sm:inline">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {sections.map((section, index) => (
              <TabsContent key={index} value={index.toString()}>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="mb-3">{section.title}</h3>
                    <p className="text-muted-foreground mb-6">{section.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          1
                        </div>
                        <div>
                          <p className="text-sm">Install or add the script to your project</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          2
                        </div>
                        <div>
                          <p className="text-sm">Configure with your API key and preferences</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          3
                        </div>
                        <div>
                          <p className="text-sm">Customize and deploy to production</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <CodeBlock code={section.code} />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
