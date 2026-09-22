import { dismissUpdate, reloadNow, useUpdate } from './update'

/** Bottom-right notice when the server has a newer build than this tab. Lives outside main and nav so the secret visuals never hide it. */
export function UpdateToast() {
  const u = useUpdate()
  if (u.status !== 'available' || u.dismissed || !u.newer) return null
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="msg">
        {u.retried
          ? 'The site is still updating. It will try again in a few minutes.'
          : 'A newer version of the site is ready. It loads the next time you open a page.'}
      </span>
      <span className="actions">
        <button type="button" className="btn" onClick={() => reloadNow(u.newer)}>Reload now</button>
        <button type="button" className="link" onClick={dismissUpdate}>Hide</button>
      </span>
    </div>
  )
}
