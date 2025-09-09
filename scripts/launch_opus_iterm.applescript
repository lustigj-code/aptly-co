-- Launches iTerm panes, runs `c`, and injects prompts for Master Orchestrator and Sessions A–H
-- Update baseDir if the project path changes
set baseDir to "/Users/juleslustig/Hubs/FX_Shield/Code_Archive/Projects/aptly.co"

set sessions to {
  {name:"Orchestrator", promptPath:"scripts/opus_prompts/session_0_orchestrator.txt"},
  {name:"A", promptPath:"scripts/opus_prompts/session_a_brand_spec.txt"},
  {name:"B", promptPath:"scripts/opus_prompts/session_b_research.txt"},
  {name:"C", promptPath:"scripts/opus_prompts/session_c_static_scan.txt"},
  {name:"D", promptPath:"scripts/opus_prompts/session_d_alignment.txt"},
  {name:"E", promptPath:"scripts/opus_prompts/session_e_accessibility.txt"},
  {name:"F", promptPath:"scripts/opus_prompts/session_f_content_seo.txt"},
  {name:"G", promptPath:"scripts/opus_prompts/session_g_perf_telemetry.txt"},
  {name:"H", promptPath:"scripts/opus_prompts/session_h_handoff.txt"}
}

tell application "iTerm"
  activate
  set newWindow to (create window with default profile)
  tell current session of newWindow
    write text "cd " & quoted form of baseDir & "; clear; c"
    delay 1
    set p0 to (read POSIX file (baseDir & "/" & (promptPath of item 1 of sessions)))
    write text p0
  end tell

  repeat with i from 2 to count of sessions
    tell newWindow
      create tab with default profile
    end tell
    tell current session of newWindow
      write text "cd " & quoted form of baseDir & "; clear; c"
      delay 1
      set p to (read POSIX file (baseDir & "/" & (promptPath of (item i of sessions))))
      write text p
    end tell
  end repeat
end tell

