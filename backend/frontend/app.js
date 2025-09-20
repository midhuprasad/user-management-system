$(document).ready(function () {
    const BASE_URL = "http://127.0.0.1:8000";

    if ($("#registerForm").length) {
        $("#registerForm").on("submit", function (e) {
            e.preventDefault();
            $.ajax({
                url: BASE_URL + "/api/auth/register/",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    username: $("#reg_username").val(),
                    email: $("#reg_email").val(),
                    password: $("#reg_password").val(),
                    password2: $("#reg_password2").val()
                }),
                success: function () {
                    alert("Registration successful! Please login.");
                    window.location.href = "/login/";
                },
                error: function (err) {
                    alert("Registration failed: " + JSON.stringify(err.responseJSON));
                }
            });
        });
    }
    // LOGIN
    // =========================
    if ($("#loginForm").length) {
        $("#loginForm").on("submit", function (e) {
            e.preventDefault();
            $.ajax({
                url: BASE_URL + "/api/auth/login/",   // ✅ correct endpoint
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    username: $("#login_username").val(),
                    password: $("#login_password").val()
                }),

                success: function (data) {
            
                    localStorage.setItem("access", data.access);
                    localStorage.setItem("refresh", data.refresh);

                    alert("Login successful!");
                    window.location.href = "/profile/";
                },
                error: function (err) {
                    alert("Login failed: " + JSON.stringify(err.responseJSON));
                }
            });
        });
    }

    // PROFILE
    // =========================
    if ($("#profileForm").length) {
        const token = localStorage.getItem("access");


        $.ajax({
            url: BASE_URL + "/api/profile/",
            method: "GET",
            headers: { Authorization: "Bearer " + token },
            success: function (data) {
                $("#disp_username").text(data.user?.username || "");
                $("#disp_email").text(data.email || "");
                $("#full_name").val(data.full_name || "");
                $("#dob").val(data.date_of_birth || "");
                $("#address").val(data.address || "");
                $("#gender").val(data.gender || "");
                $("#mobile_number").val(data.mobile_number || "");
            },
            error: function (err) {
                alert("Failed to load profile. Please login again.");
                window.location.href = "/login/";
            }
        });

    
        $("#profileForm").on("submit", function (e) {
            e.preventDefault();
            $.ajax({
                url: BASE_URL + "/api/profile/",
                method: "PUT",
                headers: { Authorization: "Bearer " + token },
                contentType: "application/json",
                data: JSON.stringify({
                    full_name: $("#full_name").val(),
                    date_of_birth: $("#dob").val(),
                    address: $("#address").val(),
                    gender: $("#gender").val(),
                    mobile_number: $("#mobile_number").val()
                }),
                success: function () {
                    alert("Profile updated successfully!");
                },
                error: function (err) {
                    alert("Profile update failed: " + JSON.stringify(err.responseJSON));
                }
            });
        });

    
        $("#logoutBtn").on("click", function () {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.href = "/";
        });
    }

    // NOTES 
    // =========================
    if ($("#notesList").length) {
        const token = localStorage.getItem("access");

        
        function loadNotes() {
            $.ajax({
                url: BASE_URL + "/api/notes/",
                method: "GET",
                headers: { Authorization: "Bearer " + token },
                success: function (data) {
                    $("#notesList").empty();
                    data.forEach(note => {
                        $("#notesList").append(`
                            <li data-id="${note.id}">
                                <b>${note.title}</b> - ${note.description}
                                <button class="deleteNote">Delete</button>
                            </li>
                        `);
                    });
                },
                error: function () {
                    alert("Failed to load notes.");
                }
            });
        }

        loadNotes();


     // Create note
$("#noteForm").on("submit", function (e) {
    e.preventDefault();
    const token = localStorage.getItem("access");

    let formData = new FormData();
    formData.append("title", $("#note_title").val());
    formData.append("description", $("#note_content").val());
    if ($("#note_attachment")[0].files.length > 0) {
        formData.append("attachment", $("#note_attachment")[0].files[0]);
    }

    $.ajax({
        url: BASE_URL + "/api/notes/",
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        processData: false,  
        contentType: false,  
        data: formData,
        success: function () {
            $("#note_title").val("");
            $("#note_content").val("");
            $("#note_attachment").val("");
            loadNotes();
        },
        error: function (err) {
            alert("Failed to add note: " + JSON.stringify(err.responseJSON));
        }
    });
});


        // Delete note
        $(document).on("click", ".deleteNote", function () {
            const noteId = $(this).parent().data("id");
            $.ajax({
                url: BASE_URL + "/api/notes/" + noteId + "/",
                method: "DELETE",
                headers: { Authorization: "Bearer " + token },
                success: function () {
                    loadNotes();
                },
                error: function () {
                    alert("Failed to delete note.");
                }
            });
        });
    }
});
