import { defineMiddleware } from 'astro:middleware';

// Temporary site-wide maintenance mode.
// To restore the live site, revert this commit and push.
export const onRequest = defineMiddleware(async (_context, _next) => {
  return new Response(
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Kritika Rastogi</title>
<style>
  html, body {
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F7F5F1;
    color: #1A1A1A;
    font-family: Georgia, 'Iowan Old Style', Palatino, serif;
    text-align: center;
    padding: 24px;
    box-sizing: border-box;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
  }
</style>
</head>
<body>
  <p>Site unavailable right now. Back soon.</p>
</body>
</html>`,
    {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    }
  );
});
