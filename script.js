
"use strict";

// ==========================================
// PORTFOLIO PROJECTS
// ==========================================

const projects = [
    {
        title: "OrderFlow — End-to-End Data Engineering & Analytics",
        category: "Data Engineering",
        status: "Portfolio project",
        description:
            "An automated data engineering pipeline that transforms Brazilian e-commerce data into a validated PostgreSQL warehouse and interactive Power BI dashboards. Includes Python orchestration, SQL transformations, data quality checks, transaction rollback, scheduling and audit monitoring.",
        tools: ["Python", "PostgreSQL", "SQL", "Power BI", "ETL"],
        image:
            "https://raw.githubusercontent.com/ShadrackHero/orderflow-data-engineering/main/screenshots/01_powerbi_overview.png",
        repo:
            "https://github.com/ShadrackHero/orderflow-data-engineering",
        demo: "",
        featured: true
    },
    {
        title: "ZA Pulse — Provincial COVID-19 Intelligence",
        category: "Analytics",
        status: "Case study",
        description:
            "An end-to-end analytics project exploring South Africa's provincial COVID-19 trends from 2020 to 2022. Built a PostgreSQL warehouse, used Python for data preparation and quality checks, and developed Power BI reporting. The fact table contains 9,909 province-date records, including 61 flagged records retained for transparency.",
        tools: ["PostgreSQL", "Python", "Power BI", "DAX"],
        image:
            "https://raw.githubusercontent.com/ShadrackHero/za-pulse-covid19-analytics/main/docs/Screenshot/Cover.png",
        repo:
            "https://github.com/ShadrackHero/za-pulse-covid19-analytics",
        demo: "",
        featured: true
    },
    {
        title: "Hybrid SVIR–ML Forecasting",
        category: "Research",
        status: "In progress",
        description:
            "A research project combining a deterministic Susceptible–Vaccinated–Infected–Recovered (SVIR) model with machine learning to investigate COVID-19 case forecasting. The work connects epidemiological modelling, vaccination dynamics and data-driven prediction. Model formulation and forecasting validation remain in progress.",
        tools: ["Python", "SVIR", "Machine learning"],
        image:
            "https://raw.githubusercontent.com/ShadrackHero/Hybrid-SVIR-ML/main/docs/Screenshot/ProjectCover.jpeg",
        repo:
            "https://github.com/ShadrackHero/Hybrid-SVIR-ML",
        demo: "",
        featured: false
    },
    {
        title: "SpendWise SA — Personal Finance Analytics",
        category: "Full-Stack Development",
        status: "Portfolio project",
        description:
            "A full-stack personal finance analytics application built to process, categorise and visualise simulated South African banking transactions. Features a PostgreSQL database, FastAPI REST endpoints, transaction management, interactive dashboards and monthly financial insights.",
        tools: [
            "Python",
            "FastAPI",
            "PostgreSQL",
            "JavaScript",
            "Chart.js"
        ],
        image:
            "https://raw.githubusercontent.com/ShadrackHero/spendwise-sa/main/docs/screenshots/Dashboard1.png",
        repo:
            "https://github.com/ShadrackHero/spendwise-sa",
        demo: "",
        featured: false
    }
];

// ==========================================
// DOM ELEMENTS
// ==========================================

const grid = document.querySelector("#project-grid");
const count = document.querySelector("#project-count");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

let activeFilter = "All";

// ==========================================
// HTML ESCAPING
// ==========================================

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// ==========================================
// PROJECT CARDS
// ==========================================

function renderProjects() {
    if (!grid) return;

    const visible = projects.filter(project =>
        activeFilter === "All" ||
        project.category === activeFilter
    );

    if (count) {
        count.textContent =
            `${visible.length} project${visible.length === 1 ? "" : "s"}`;
    }

    if (!visible.length) {
        grid.innerHTML =
            '<div class="empty-state">No projects in this category yet.</div>';
        return;
    }

    grid.innerHTML = visible.map(project => {
        const tags = project.tools
            .map(tool =>
                `<span class="tag">${escapeHtml(tool)}</span>`
            )
            .join("");

        const cover = project.image
            ? `<img class="card-cover"
          src="${escapeHtml(project.image)}"
          alt="${escapeHtml(project.title)} preview"
          loading="lazy">`
            : "";

        const repoLink = project.repo
            ? `<a href="${escapeHtml(project.repo)}"
          target="_blank"
          rel="noopener noreferrer">GitHub ↗</a>`
            : "";

        const demoLink = project.demo
            ? `<a href="${escapeHtml(project.demo)}"
          target="_blank"
          rel="noopener noreferrer">Live demo ↗</a>`
            : "";

        return `
      <article class="project-card">
        ${cover}

          <div class="card-top">
           <span class="card-type">
            ${escapeHtml(project.status)} ·
            ${escapeHtml(project.category)}
           </span>
          </div>

          <h3>${escapeHtml(project.title)}</h3>

          <p>${escapeHtml(project.description)}</p>

          <div class="tag-list">
            ${tags}
          </div>

          <div class="card-links">
            ${repoLink}
            ${demoLink}
          </div>
        </div>
      </article>
    `;
    }).join("");
}

// ==========================================
// PROJECT FILTERS
// ==========================================

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.setAttribute(
                "aria-pressed",
                String(item === button)
            );
        });

        renderProjects();
    });
});

// ==========================================
// LIGHT / DARK THEME
// ==========================================

function applyTheme(theme, persist = false) {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
        );
    }

    if (persist) {
        try {
            localStorage.setItem("theme", theme);
        } catch (error) {
            console.warn("Theme preference could not be saved.");
        }
    }
}

let initialTheme = "light";

try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
        initialTheme = savedTheme;
    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        initialTheme = "dark";
    }
} catch (error) {
    initialTheme = "light";
}

applyTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");

        applyTheme(
            currentTheme === "dark" ? "light" : "dark",
            true
        );
    });
}

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        navLinks.classList.toggle("open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}

// ==========================================
// FOOTER YEAR
// ==========================================

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ==========================================
// INITIALISE PORTFOLIO
// ==========================================

renderProjects();