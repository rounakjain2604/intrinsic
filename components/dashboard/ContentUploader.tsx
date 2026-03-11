"use client";

import { useState } from "react";

interface UploadResult {
    fileName: string;
    topicTitle: string;
    moduleTitle: string;
    losTitle: string;
}

export default function ContentUploader() {
    const [files, setFiles] = useState<FileList | null>(null);
    const [topicTitle, setTopicTitle] = useState("");
    const [moduleTitle, setModuleTitle] = useState("");
    const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">(
        "idle"
    );
    const [message, setMessage] = useState<string | null>(null);
    const [results, setResults] = useState<UploadResult[]>([]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!files || files.length === 0) {
            setStatus("error");
            setMessage("Choose at least one markdown file before uploading.");
            return;
        }

        setStatus("uploading");
        setMessage(null);
        setResults([]);

        const formData = new FormData();
        for (const file of Array.from(files)) {
            formData.append("files", file);
        }

        if (topicTitle.trim()) {
            formData.append("topicTitle", topicTitle.trim());
        }

        if (moduleTitle.trim()) {
            formData.append("moduleTitle", moduleTitle.trim());
        }

        try {
            const response = await fetch("/api/study-content/upload", {
                method: "POST",
                body: formData,
            });

            const payload = (await response.json()) as {
                message?: string;
                results?: UploadResult[];
            };

            if (!response.ok) {
                throw new Error(payload.message ?? "Upload failed.");
            }

            setStatus("success");
            setMessage(payload.message ?? "Your files were uploaded.");
            setResults(payload.results ?? []);
            setFiles(null);
            const fileInput = document.getElementById(
                "study-file-input"
            ) as HTMLInputElement | null;
            if (fileInput) {
                fileInput.value = "";
            }
        } catch (error) {
            setStatus("error");
            setMessage(
                error instanceof Error
                    ? error.message
                    : "The upload could not be completed."
            );
        }
    }

    return (
        <div className="rounded-2xl border border-[#2D2A26]/10 bg-[#F5F1EA] p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)]">
            <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26]">
                Upload LOS Markdown
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#6B6560]">
                Add one file or several files at once. If your markdown already names
                the Topic and Learning Module, leave the helper fields blank. If it
                does not, fill them once and the uploader will apply them to every file
                in this batch.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-[#2D2A26]">
                            Topic (optional helper)
                        </span>
                        <input
                            value={topicTitle}
                            onChange={(event) => setTopicTitle(event.target.value)}
                            className="w-full rounded-xl border border-[#2D2A26]/10 bg-white px-4 py-3 text-sm text-[#2D2A26] outline-none transition focus:border-[#E8694A]"
                            placeholder="Example: Equity Valuation"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-[#2D2A26]">
                            Learning Module (optional helper)
                        </span>
                        <input
                            value={moduleTitle}
                            onChange={(event) => setModuleTitle(event.target.value)}
                            className="w-full rounded-xl border border-[#2D2A26]/10 bg-white px-4 py-3 text-sm text-[#2D2A26] outline-none transition focus:border-[#E8694A]"
                            placeholder="Example: Learning Module 3"
                        />
                    </label>
                </div>

                <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#2D2A26]">
                        Markdown files
                    </span>
                    <input
                        id="study-file-input"
                        type="file"
                        accept=".md,.markdown,text/markdown,text/plain"
                        multiple
                        onChange={(event) => setFiles(event.target.files)}
                        className="block w-full rounded-xl border border-dashed border-[#2D2A26]/20 bg-white px-4 py-4 text-sm text-[#6B6560]"
                    />
                </label>

                <button
                    type="submit"
                    disabled={status === "uploading"}
                    className="inline-flex items-center justify-center rounded-xl bg-[#E8694A] px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(232,105,74,0.25)] transition hover:bg-[#D45E40] disabled:opacity-60"
                >
                    {status === "uploading" ? "Uploading..." : "Upload Notes"}
                </button>
            </form>

            {message && (
                <div
                    className={`mt-5 rounded-xl px-4 py-3 text-sm ${
                        status === "error"
                            ? "bg-[#C94F3A]/10 text-[#C94F3A]"
                            : "bg-[#5B9E6F]/10 text-[#2D2A26]"
                    }`}
                >
                    {message}
                </div>
            )}

            {results.length > 0 && (
                <div className="mt-6 rounded-2xl border border-[#2D2A26]/10 bg-white p-5">
                    <h3 className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[#2D2A26]">
                        Uploaded This Round
                    </h3>
                    <ul className="mt-3 space-y-3 text-sm text-[#6B6560]">
                        {results.map((result) => (
                            <li key={result.fileName}>
                                <span className="font-medium text-[#2D2A26]">
                                    {result.fileName}
                                </span>
                                {" -> "}
                                {result.topicTitle} / {result.moduleTitle} / {result.losTitle}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
