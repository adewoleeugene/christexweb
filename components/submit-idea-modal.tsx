"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowUpRight, Send, Loader2 } from "lucide-react"

import { submitIdeaAction } from "@/app/actions/submit-idea"

export function SubmitIdeaModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const result = await submitIdeaAction(null, formData) // Passing null as prevState since we aren't using useFormState here yet

        setIsSubmitting(false)

        if (result.success) {
            setIsSuccess(true)
            setErrorMessage("")
        } else {
            setErrorMessage(result.message || "Something went wrong.")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) {
                setTimeout(() => {
                    setIsSuccess(false)
                    setIsSubmitting(false)
                }, 300)
            }
        }}>
            <DialogTrigger asChild>
                <button
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground hover:text-accent transition-colors group"
                >
                    Submit Your Idea
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-[#0a0a0a] border-border text-foreground p-0 overflow-hidden">
                {/* Abstract Background Gradient to match requested style */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                                <Send className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold">Idea Sent!</h3>
                            <p className="text-muted-foreground max-w-xs">
                                Thank you for your submission. Our team will review your idea.
                            </p>
                            <Button onClick={() => setIsOpen(false)} variant="outline" className="mt-6">
                                Close
                            </Button>
                        </div>
                    ) : (
                        <>
                            <DialogHeader className="mb-8">
                                <DialogTitle className="text-3xl font-light text-foreground">
                                    Submit <span className="text-muted-foreground">Proposal</span>
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Share your innovative solution with our venture studio.
                                </p>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                                            Project Title
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            placeholder="e.g. Chess Puzzle App"
                                            className="bg-muted/30 border-border/50 focus:border-primary/50 text-lg font-medium p-4 h-auto"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="problem" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                                            Problem to Solve
                                        </Label>
                                        <Textarea
                                            id="problem"
                                            name="problem"
                                            placeholder="Describe the core problem users face..."
                                            className="bg-muted/30 border-border/50 focus:border-primary/50 min-h-[100px] resize-none"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                                            Category
                                        </Label>
                                        <select
                                            id="category"
                                            name="category"
                                            className="flex h-10 w-full rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary/50"
                                            required
                                        >
                                            <option value="" disabled selected>Select a category</option>
                                            <option value="FinTech">FinTech</option>
                                            <option value="CivicTech">CivicTech</option>
                                            <option value="Logistics">Logistics</option>
                                            <option value="Infrastructure">Infrastructure</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="solution" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                                            Possible Solution
                                        </Label>
                                        <Textarea
                                            id="solution"
                                            name="solution"
                                            placeholder="How does your idea solve this problem?"
                                            className="bg-muted/30 border-border/50 focus:border-primary/50 min-h-[100px] resize-none"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="resources" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                                            Resources / Links
                                        </Label>
                                        <Input
                                            id="resources"
                                            name="resources"
                                            placeholder="GITHUB REPO, FIGMA, ETC."
                                            className="bg-muted/30 border-border/50 focus:border-primary/50 font-mono text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 min-w-[140px]"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Submit Proposal
                                                <ArrowUpRight className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                                {errorMessage && (
                                    <p className="text-red-500 text-sm mt-2 text-right">{errorMessage}</p>
                                )}
                            </form>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog >
    )
}
