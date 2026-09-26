// Scans source files to detect npm dependencies from import statements
/*export function detectDependencies(files) {
    const deps = {};
    if (!files) return deps;

    const allCode = Object.values(files).join("\n");
    const filePaths = Object.keys(files);

    const isLocalFileOrFolder = (pkgName) => {
        const name = pkgName.startsWith("@/") ? pkgName.substring(2) : pkgName;
        return (
            pkgName.startsWith("@/") ||
            pkgName === "@" ||
            filePaths.some(p => 
                p === `/${name}` || 
                p.startsWith(`/${name}/`) || 
                p.replace(/\.[^/.]+$/, "") === `/${name}`
            )
        );
    };

    const importRegex = /from\s+['"]([^./][^'"]*)['"]/g;
    let match;
    while ((match = importRegex.exec(allCode)) !== null) {
        const rawImport = match[1];

        // Scoped packages like @scope/package, normal packages like package
        const pkg = rawImport.startsWith("@") && !rawImport.startsWith("@/")
            ? rawImport.split("/").slice(0, 2).join("/")
            : rawImport.split("/")[0];

        // Skip react (included in template), react-dom, and local modules
        if (pkg !== "react" && pkg !== "react-dom" && !isLocalFileOrFolder(pkg)) {
            deps[pkg] = "latest";
        }
    }
    return deps;
}*/
// Scans source files to detect npm dependencies from import statements

export function detectDependencies(files) {
    const deps = {};

    if (!files) return deps;

    const allCode = Object.values(files)
        .map((file) =>
            typeof file === "string"
                ? file
                : file?.content || ""
        )
        .join("\n");

    const filePaths = Object.keys(files);

    const isLocalFileOrFolder = (pkgName) => {
        const name = pkgName.startsWith("@/")
            ? pkgName.substring(2)
            : pkgName;

        return (
            pkgName.startsWith("@/") ||
            pkgName === "@" ||
            filePaths.some(
                (p) =>
                    p === `/${name}` ||
                    p.startsWith(`/${name}/`) ||
                    p.replace(/\.[^/.]+$/, "") === `/${name}`
            )
        );
    };

    const importRegex =
        /(?:import\s+(?:[\s\S]*?\s+from\s+)?|require\s*\(\s*)['"]([^'"]+)['"]/g;

    let match;

    while ((match = importRegex.exec(allCode)) !== null) {
        const rawImport = match[1];

        // Ignore local imports
        if (
            rawImport.startsWith(".") ||
            rawImport.startsWith("/")
        ) {
            continue;
        }

        // Scoped packages: @scope/package
        // Normal packages: package
        const pkg =
            rawImport.startsWith("@") && !rawImport.startsWith("@/")
                ? rawImport.split("/").slice(0, 2).join("/")
                : rawImport.split("/")[0];

        // Skip packages already available in the React template
        if (
            pkg !== "react" &&
            pkg !== "react-dom" &&
            !isLocalFileOrFolder(pkg)
        ) {
            deps[pkg] = "latest";
        }
    }

    return deps;
}
