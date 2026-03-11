import React from "react";

interface MarkdownFallbackProps {
    source: string;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let partIndex = 0;

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }

        const token = match[0];
        const key = `${keyPrefix}-${partIndex}`;

        if (token.startsWith("**") && token.endsWith("**")) {
            nodes.push(
                <strong key={key} className="font-semibold text-[#2D2A26]">
                    {token.slice(2, -2)}
                </strong>
            );
        } else if (token.startsWith("*") && token.endsWith("*")) {
            nodes.push(
                <em key={key} className="italic">
                    {token.slice(1, -1)}
                </em>
            );
        } else if (token.startsWith("`") && token.endsWith("`")) {
            nodes.push(
                <code
                    key={key}
                    className="font-[family-name:var(--font-mono)] text-[#E8694A] bg-[#EDE8DF] rounded px-2 py-1 text-sm"
                >
                    {token.slice(1, -1)}
                </code>
            );
        }

        lastIndex = pattern.lastIndex;
        partIndex += 1;
    }

    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex));
    }

    return nodes;
}

function isTableDivider(line: string) {
    return /^\|\s*[-: ]+\|/.test(line.trim());
}

function parseTableRow(line: string) {
    return line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim());
}

export default function MarkdownFallback({
    source,
}: MarkdownFallbackProps) {
    const lines = source.split(/\r?\n/);
    const blocks: React.ReactNode[] = [];

    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) {
            i += 1;
            continue;
        }

        if (/^---+$/.test(trimmed)) {
            blocks.push(
                <hr
                    key={`hr-${i}`}
                    className="border-t border-[#2D2A26]/[0.08] my-10"
                />
            );
            i += 1;
            continue;
        }

        if (trimmed.startsWith("```")) {
            const codeLines: string[] = [];
            i += 1;

            while (i < lines.length && !lines[i].trim().startsWith("```")) {
                codeLines.push(lines[i]);
                i += 1;
            }

            if (i < lines.length) {
                i += 1;
            }

            blocks.push(
                <pre
                    key={`code-${i}`}
                    className="overflow-x-auto rounded-2xl bg-[#2D2A26] px-5 py-4 font-[family-name:var(--font-mono)] text-sm leading-7 text-[#FAF8F5]"
                >
                    <code>{codeLines.join("\n")}</code>
                </pre>
            );
            continue;
        }

        if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
            blocks.push(
                <div
                    key={`math-${i}`}
                    className="overflow-x-auto rounded-2xl border border-[#2D2A26]/10 bg-[#FFFDF9] px-5 py-4 font-[family-name:var(--font-mono)] text-sm text-[#2D2A26]"
                >
                    {trimmed}
                </div>
            );
            i += 1;
            continue;
        }

        const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            const text = headingMatch[2];

            if (level === 1) {
                blocks.push(
                    <h2
                        key={`h1-${i}`}
                        className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-[#2D2A26] mt-12"
                    >
                        {renderInline(text, `h1-${i}`)}
                    </h2>
                );
            } else if (level === 2) {
                blocks.push(
                    <h2
                        key={`h2-${i}`}
                        className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26] mt-12"
                    >
                        {renderInline(text, `h2-${i}`)}
                    </h2>
                );
            } else {
                blocks.push(
                    <h3
                        key={`h3-${i}`}
                        className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26] mt-8"
                    >
                        {renderInline(text, `h3-${i}`)}
                    </h3>
                );
            }

            i += 1;
            continue;
        }

        if (trimmed.startsWith(">")) {
            const quoteLines: string[] = [];

            while (i < lines.length && lines[i].trim().startsWith(">")) {
                quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
                i += 1;
            }

            blocks.push(
                <blockquote
                    key={`quote-${i}`}
                    className="border-l-4 border-[#2D2A26]/10 pl-5 italic text-[#6B6560] my-6"
                >
                    {quoteLines.map((quoteLine, quoteIndex) => (
                        <p key={`quote-line-${quoteIndex}`}>
                            {renderInline(
                                quoteLine,
                                `quote-${i}-${quoteIndex}`
                            )}
                        </p>
                    ))}
                </blockquote>
            );
            continue;
        }

        if (trimmed === "<details>") {
            let summary = "Expand";
            const detailLines: string[] = [];
            i += 1;

            while (i < lines.length && lines[i].trim() !== "</details>") {
                const current = lines[i].trim();
                const summaryMatch = current.match(
                    /^<summary>(.*)<\/summary>$/
                );

                if (summaryMatch) {
                    summary = summaryMatch[1].replace(/<\/?strong>/g, "").trim();
                } else {
                    detailLines.push(lines[i]);
                }

                i += 1;
            }

            if (i < lines.length) {
                i += 1;
            }

            blocks.push(
                <details
                    key={`details-${i}`}
                    className="rounded-2xl border border-[#2D2A26]/10 bg-[#FFFDF9] px-5 py-4"
                >
                    <summary className="cursor-pointer font-[family-name:var(--font-sans)] font-semibold text-[#2D2A26]">
                        {summary}
                    </summary>
                    <div className="mt-4 space-y-4">
                        <MarkdownFallback source={detailLines.join("\n")} />
                    </div>
                </details>
            );
            continue;
        }

        if (trimmed.startsWith("|")) {
            const tableLines: string[] = [];

            while (i < lines.length && lines[i].trim().startsWith("|")) {
                tableLines.push(lines[i]);
                i += 1;
            }

            const rawRows = tableLines.filter(
                (tableLine) => !isTableDivider(tableLine)
            );

            if (rawRows.length > 0) {
                const [headerRow, ...bodyRows] = rawRows.map(parseTableRow);
                blocks.push(
                    <div
                        key={`table-${i}`}
                        className="overflow-x-auto my-8 rounded-2xl border border-[#2D2A26]/10 bg-[#FFFDF9] shadow-[0_2px_12px_rgba(45,42,38,0.04)]"
                    >
                        <table className="w-full border-collapse font-[family-name:var(--font-sans)] text-sm">
                            <thead>
                                <tr>
                                    {headerRow.map((cell, cellIndex) => (
                                        <th
                                            key={`head-${cellIndex}`}
                                            className="bg-[#2D2A26] px-4 py-3 text-left font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#FAF8F5]"
                                        >
                                            {renderInline(
                                                cell,
                                                `th-${i}-${cellIndex}`
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {bodyRows.map((row, rowIndex) => (
                                    <tr
                                        key={`row-${rowIndex}`}
                                        className="even:bg-[#F5F1EA]/80"
                                    >
                                        {row.map((cell, cellIndex) => (
                                            <td
                                                key={`cell-${rowIndex}-${cellIndex}`}
                                                className="border-b border-[#2D2A26]/8 px-4 py-3 align-top text-[#2D2A26]"
                                            >
                                                {renderInline(
                                                    cell,
                                                    `td-${i}-${rowIndex}-${cellIndex}`
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            }

            continue;
        }

        const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/);
        if (unorderedMatch) {
            const items: string[] = [];

            while (i < lines.length) {
                const itemMatch = lines[i].trim().match(/^[-*]\s+(.+)$/);
                if (!itemMatch) {
                    break;
                }
                items.push(itemMatch[1]);
                i += 1;
            }

            blocks.push(
                <ul
                    key={`ul-${i}`}
                    className="list-disc list-inside space-y-2 text-[#6B6560]"
                >
                    {items.map((item, itemIndex) => (
                        <li
                            key={`ul-item-${itemIndex}`}
                            className="font-[family-name:var(--font-sans)] text-base leading-8"
                        >
                            {renderInline(item, `ul-${i}-${itemIndex}`)}
                        </li>
                    ))}
                </ul>
            );
            continue;
        }

        const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
        if (orderedMatch) {
            const items: string[] = [];

            while (i < lines.length) {
                const itemMatch = lines[i].trim().match(/^\d+\.\s+(.+)$/);
                if (!itemMatch) {
                    break;
                }
                items.push(itemMatch[1]);
                i += 1;
            }

            blocks.push(
                <ol
                    key={`ol-${i}`}
                    className="list-decimal list-inside space-y-2 text-[#6B6560]"
                >
                    {items.map((item, itemIndex) => (
                        <li
                            key={`ol-item-${itemIndex}`}
                            className="font-[family-name:var(--font-sans)] text-base leading-8"
                        >
                            {renderInline(item, `ol-${i}-${itemIndex}`)}
                        </li>
                    ))}
                </ol>
            );
            continue;
        }

        const paragraphLines: string[] = [];
        while (i < lines.length) {
            const current = lines[i].trim();
            if (
                !current ||
                /^---+$/.test(current) ||
                current.startsWith("```") ||
                current.startsWith("|") ||
                current.startsWith(">") ||
                current === "<details>" ||
                /^(#{1,6})\s+/.test(current) ||
                /^[-*]\s+/.test(current) ||
                /^\d+\.\s+/.test(current) ||
                (current.startsWith("$$") && current.endsWith("$$"))
            ) {
                break;
            }

            paragraphLines.push(current);
            i += 1;
        }

        if (paragraphLines.length > 0) {
            const paragraph = paragraphLines.join(" ");
            blocks.push(
                <p
                    key={`p-${i}`}
                    className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-8"
                >
                    {renderInline(paragraph, `p-${i}`)}
                </p>
            );
        }
    }

    return <>{blocks}</>;
}
