"use client";

const STYLES = {
  comment: "text-zinc-500 italic",
  keyword: "text-violet-600 font-semibold",
  variable: "text-emerald-700 font-medium",
  constant: "text-amber-700 font-medium",
  rule: "text-blue-600 font-semibold",
} as const;

function highlightLine(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = line;

  // Split by comments first to avoid highlighting inside comments
  const commentIdx = remaining.indexOf("//");
  const codePart = commentIdx >= 0 ? remaining.slice(0, commentIdx) : remaining;
  const commentPart = commentIdx >= 0 ? remaining.slice(commentIdx) : "";

  // Tokenize code part (before //) — order: rules, keywords, constants, variables
  const tokenRegex =
    /(checkBR\d+|Checker|if|else|in|is|init|→|&&|\|\||==|!=|>=|<=|!|&(?!&)|\bRRC_[A-Z0-9_]+\b|\bATTACH_[A-Z0-9_]+\b|\bREG_[A-Z0-9_]+\b|\bAUTH_[A-Z0-9_]+\b|\bIDENTITY_[A-Z0-9_]+\b|\bTAU_[A-Z0-9_]+\b|\bSERVICE_[A-Z0-9_]+\b|\bDETACH_[A-Z0-9_]+\b|\bSECURITY_MODE_CMD\b|\b[A-Z][A-Z0-9_]+\b|\bNULL\b|\bError\b|\bNo_error\b|\bANOMALOUS\b|\bNORMAL\b|\bTHRESH\b|θ_[a-z0-9_]+|\b[a-z_][a-z0-9_]*\b)/gi;

  let lastIdx = 0;
  let m;
  let key = 0;
  const regex = new RegExp(tokenRegex.source, "g");
  while ((m = regex.exec(codePart)) !== null) {
    const token = m[0];

    if (lastIdx < m.index) {
      parts.push(codePart.slice(lastIdx, m.index));
    }

    if (/^checkBR\d+$/i.test(token) || token === "Checker") {
      parts.push(<span key={key++} className={STYLES.rule}>{token}</span>);
    } else if (["if", "else", "in", "is", "init", "→", "&&", "||", "==", "!=", ">=", "<=", "!", "&"].includes(token)) {
      parts.push(<span key={key++} className={STYLES.keyword}>{token}</span>);
    } else if (
      /^[A-Z][A-Z0-9_]*$/.test(token) ||
      ["NULL", "Error", "No_error", "ANOMALOUS", "NORMAL", "THRESH"].includes(token) ||
      /^RRC_|^ATTACH_|^REG_|^AUTH_|^TAU_|^SERVICE_|^DETACH_|^IDENTITY_|^SECURITY_MODE/.test(token)
    ) {
      parts.push(<span key={key++} className={STYLES.constant}>{token}</span>);
    } else if (/^[a-z_][a-z0-9_]*$/.test(token) || /^θ_/.test(token)) {
      parts.push(<span key={key++} className={STYLES.variable}>{token}</span>);
    } else {
      parts.push(token);
    }
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < codePart.length) {
    parts.push(codePart.slice(lastIdx));
  }

  if (commentPart) {
    parts.push(<span key="comment" className={STYLES.comment}>{commentPart}</span>);
  }

  return parts;
}

export default function CodeBlock({
  code,
  className = "",
  size = "sm",
}: {
  code: string;
  className?: string;
  size?: "sm" | "base";
}) {
  const lines = code.split("\n");
  const sizeClass = size === "base" ? "text-base" : "text-xs";

  return (
    <pre
      className={`font-mono ${sizeClass} bg-zinc-100 p-4 rounded border border-zinc-200 overflow-auto whitespace-pre ${className}`}
      style={{ lineHeight: 1.6 }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {highlightLine(line)}
          {i < lines.length - 1 ? "\n" : ""}
        </span>
      ))}
    </pre>
  );
}
