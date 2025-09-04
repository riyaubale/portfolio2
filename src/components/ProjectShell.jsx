import { useEffect, useRef, useState, useMemo } from "react";

export default function ProjectShell({ projects = [] }) {
  const normalized = useMemo(
    () =>
      projects.map((p) => ({
        ...p,
        name: (p.handle || p.title || "").replace(/^@/, ""),
      })),
    [projects]
  );

  const byName = useMemo(() => {
    const m = new Map();
    normalized.forEach((p) => m.set(p.name.toLowerCase(), p));
    return m;
  }, [normalized]);

  const [lines, setLines] = useState(["Welcome to Riya's Shell! — type `ls`"]);
  const [value, setValue] = useState("");
  const [cwd, setCwd] = useState("/projects");
  const inputRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

  const print = (...msgs) =>
    setLines((prev) => [...prev, ...msgs.map((m) => m)]);

  const prompt = () => `${cwd} $`;
  const inProjects = cwd === "/projects";
  const currentName = cwd.startsWith("/projects/") ? cwd.split("/").pop() : null;
  const currentProject = currentName
    ? byName.get(currentName.toLowerCase())
    : null;

  // --- Commands ---
  const run = (raw) => {
    const input = raw.trim();
    if (!input) return;

    print(`${prompt()} ${input}`);
    const [cmd, arg] = input.split(/\s+/, 2);

    switch ((cmd || "").toLowerCase()) {
      case "ls":
        if (inProjects) {
          if (normalized.length === 0) print("(no projects)");
          else print(normalized.map((p) => p.name).join("  "));
        } else if (currentProject) {
          print("details");
        }
        break;

      case "cd":
        if (arg === "..") {
          setCwd("/projects");
        } else if (inProjects && arg) {
          const key = arg.toLowerCase();
          if (byName.has(key)) {
            setCwd(`/projects/${byName.get(key).name}`);
          } else {
            print(`No project: ${arg}`);
          }
        }
        break;

      case "cat":
        if (arg === "details" && currentProject) {
          const desc = currentProject.description;

          print(
            <div key={Date.now()} className="space-y-2">
              <div className="font-semibold text-white">
                {currentProject.title}
              </div>

              {/* description: array → bullets, string → split & normalize (same as Timeline) */}
              {Array.isArray(desc) ? (
                <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-white/80">
                  {desc
                    .map((s) => String(s).replace(/^[\s*•\-]+/, "").trim())
                    .filter(Boolean)
                    .map((point, i) => (
                      <li key={i} className="leading-snug">
                        {point}
                      </li>
                    ))}
                </ul>
              ) : (
                <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-white/80">
                  {String(desc || "")
                    .split(/\r?\n|[•\u2022]|(?:\s*-\s*)/g)
                    .map((s) => s.replace(/^[\s*•\-]+/, "").trim())
                    .filter(Boolean)
                    .map((point, i) => (
                      <li key={i} className="leading-snug">
                        {point}
                      </li>
                    ))}
                </ul>
              )}

              {currentProject.url && (
                <div className="text-sm">
                  <span className="text-white/60 mr-1">GitHub:</span>
                  <a
                    href={currentProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ba90fc] hover:underline break-all"
                  >
                    {currentProject.url}
                  </a>
                </div>
              )}
            </div>
          );
        } else {
          print("Usage: cat details");
        }
        break;

      case "clear":
        setLines([]);
        break;

      default:
        print(`Unknown command: ${cmd}`);
    }
  };

  // --- TAB Autocomplete ---
  const COMMANDS = ["ls", "cd", "cat", "clear"];
  const handleTab = (e) => {
    e.preventDefault();
    const cur = value;
    const parts = cur.split(/\s+/);
    const hasSpace = /\s/.test(cur.trimEnd());

    if (parts.length === 1 && !hasSpace) {
      const partial = parts[0] || "";
      const matches = COMMANDS.filter((c) => c.startsWith(partial));
      complete(matches, partial, (completion) => setValue(completion));
      return;
    }

    const cmd = (parts[0] || "").toLowerCase();
    const partialArg = parts[1] || "";

    if (cmd === "cd" && inProjects) {
      const names = normalized.map((p) => p.name);
      const matches = names.filter((n) =>
        n.toLowerCase().startsWith(partialArg.toLowerCase())
      );
      complete(matches, partialArg, (completion) =>
        setValue(`${parts[0]} ${completion}`)
      );
      return;
    }

    if (cmd === "cat" && currentProject) {
      const matches = ["details"].filter((n) =>
        n.startsWith(partialArg.toLowerCase())
      );
      complete(matches, partialArg, (completion) =>
        setValue(`${parts[0]} ${completion}`)
      );
      return;
    }
  };

  const complete = (matches, partial, apply) => {
    if (matches.length === 0) return;
    if (matches.length === 1) {
      apply(matches[0]);
      return;
    }
    const common = lcp(matches);
    if (common && common.length > partial.length) {
      apply(common);
    } else {
      print(matches.join("  "));
    }
  };

  const lcp = (arr) => {
    if (arr.length === 0) return "";
    let prefix = arr[0];
    for (let i = 1; i < arr.length; i++) {
      while (arr[i].indexOf(prefix) !== 0) {
        prefix = prefix.slice(0, -1);
        if (!prefix) return "";
      }
    }
    return prefix;
  };

  const onKeyDown = (e) => {
    if (e.key === "Tab") return handleTab(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = value;
    setValue("");
    run(v);
  };

  return (
    <div
      className="rounded-2xl border border-white/10 bg-[#0b0b0b]/90 p-4 font-mono text-left"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="h-64 overflow-y-auto space-y-1 text-sm mb-2">
        {lines.map((ln, i) => (
          <div key={i} className="whitespace-pre-wrap">
            <span className="text-white/40 mr-2">[{i + 1}]</span>
            {ln}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <span className="text-white/50">{prompt()}</span>
        <input
          ref={inputRef}
          value={value}
          onKeyDown={onKeyDown}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm placeholder-white/30"
          placeholder="try: ls • cd projectname • cat details"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
