use tauri::Manager;

#[tauri::command]
async fn open_webpage(app: tauri::AppHandle, url: String) -> Result<(), String> {
    let label = format!("webview-{}", url.replace('/', "_").replace(':', "_").replace('.', "_").replace("?", "_").replace("&", "_"));

    if let Some(win) = app.get_webview_window(&label) {
        win.set_focus().unwrap();
        return Ok(());
    }

    let parsed_url = tauri::Url::parse(&url).map_err(|e| e.to_string())?;

    tauri::WebviewWindowBuilder::new(&app, &label, tauri::WebviewUrl::External(parsed_url))
        .title(url.clone())
        .decorations(true)
        .resizable(true)
        .inner_size(3840.0, 2160.0)
        .position(0.0, 0.0)
        .build()
        .map_err(|e| e.to_string())?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_webpage])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}