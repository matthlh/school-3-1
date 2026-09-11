-- Dump Things3 state for the morning check.
-- Usage: osascript things_today.applescript
tell application "Things3"
	set out to "== TODAY ==" & linefeed
	repeat with t in to dos of list "Today"
		set pn to ""
		try
			set pn to name of project of t
		end try
		set an to ""
		try
			set an to name of area of t
		end try
		set dd to ""
		try
			set dd to due date of t as string
		end try
		set tg to ""
		try
			set tg to tag names of t
		end try
		set out to out & "- " & name of t & " | project=" & pn & " | area=" & an & " | due=" & dd & " | tags=" & tg & linefeed
	end repeat
	set out to out & "INBOX count: " & (count of to dos of list "Inbox") & linefeed
	set out to out & "TODAY count: " & (count of to dos of list "Today") & linefeed
	set out to out & "== UPCOMING (next 14 days) ==" & linefeed
	set cutoff to (current date) + 14 * days
	repeat with t in to dos of list "Upcoming"
		set dd to missing value
		set ad to missing value
		try
			set dd to due date of t
		end try
		try
			set ad to activation date of t
		end try
		set showIt to false
		if dd is not missing value then
			if dd ≤ cutoff then set showIt to true
		end if
		if ad is not missing value then
			if ad ≤ cutoff then set showIt to true
		end if
		if showIt then
			set pn to ""
			try
				set pn to name of project of t
			end try
			set out to out & "- " & name of t & " | project=" & pn & " | start=" & (ad as string) & " | due=" & (dd as string) & linefeed
		end if
	end repeat
	set out to out & "== PROJECTS ==" & linefeed
	repeat with p in projects
		if status of p is open then
			set out to out & "- " & name of p & " (" & (count of to dos of p) & " open)" & linefeed
		end if
	end repeat
	return out
end tell
