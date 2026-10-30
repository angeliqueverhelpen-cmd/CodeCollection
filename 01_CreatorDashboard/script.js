const platformCardsEl = document.getElementById("platform-cards");

const platforms = [
  {
    name: "TikTok",
    handle: "@jouwaccount",
    icon: "♪",
    className: "tiktok",
    views: [1932, 2300, 453, 5222, 6733, 7402, 8334],
  },
  {
    name: "Instagram",
    handle: "@jouwaccount",
    icon: "◎",
    className: "instagram",
    views: [936, 2576, 453, 7013, 5489, 7402, 3921],
  },
  {
    name: "YouTube",
    handle: "@jouwkanaal",
    icon: "▶",
    className: "youtube",
    views: [2300, 453, 5222, 989, 6733, 7402, 2789],
  },
];

function mean(viewsArray) {
  const totalViews = viewsArray.reduce((total, views) => total + views, 0);
  return totalViews / viewsArray.length;
}

function median(viewsArray) {
  const sortedViews = viewsArray.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedViews.length / 2);

  if (sortedViews.length % 2 !== 0) {
    return sortedViews[middleIndex];
  }

  return (sortedViews[middleIndex - 1] + sortedViews[middleIndex]) / 2;
}

function formatViews(views) {
  return new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }).format(views);
}

function createPlatformCard(platform) {
  const highestViewCount = Math.max(...platform.views);
  const bars = platform.views
    .map((views, index) => {
      const height = Math.max((views / highestViewCount) * 100, 8);
      return `
        <span
          class="chart-bar${views === highestViewCount ? " chart-bar--peak" : ""}"
          style="--bar-height: ${height}%"
          title="Post ${index + 1}: ${formatViews(views)} views"
          aria-label="Post ${index + 1}: ${formatViews(views)} views"
        ></span>`;
    })
    .join("");

  return `
    <article class="platform-card ${platform.className}">
      <div class="card-top">
        <div class="platform-identity">
          <span class="platform-icon" aria-hidden="true">${platform.icon}</span>
          <div>
            <h3>${platform.name}</h3>
            <p>${platform.handle}</p>
          </div>
        </div>
        <span class="post-count">7 POSTS</span>
      </div>

      <div class="views-total">
        <span class="metric-label">TOTAAL AANTAL VIEWS</span>
        <p>${formatViews(platform.views.reduce((total, views) => total + views, 0))}</p>
      </div>

      <div class="chart" role="img" aria-label="Views per post: ${platform.views.map(formatViews).join(", ")}">
        ${bars}
      </div>
      <div class="chart-labels" aria-hidden="true">
        <span>POST 1</span><span>POST 7</span>
      </div>

      <div class="card-divider"></div>
      <div class="stats-row">
        <div class="stat">
          <span class="metric-label">GEMIDDELDE</span>
          <strong>${formatViews(mean(platform.views))}</strong>
          <small>views per post</small>
        </div>
        <div class="stat stat--median">
          <span class="metric-label">MEDIAAN</span>
          <strong>${formatViews(median(platform.views))}</strong>
          <small>views per post</small>
        </div>
      </div>
    </article>`;
}

platformCardsEl.innerHTML = platforms.map(createPlatformCard).join("");
