export function getCurrentUser() {

    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        console.error("Invalid user data:", error);
        return null;
    }
}


export function canAccess(permission) {

    const user = getCurrentUser();

    switch(permission) {

        // Anyone can view the map
        case "PUBLIC":
            return true;


        // Any account holder
        case "USER":
            return user !== null;


        // College Student, Graduate Student, Faculty, Staff, Admin
        case "REGISTERED_USER":

            if (!user) {
                return false;
            }

            return [
                2, // College Student
                3, // Graduate Student
                4, // Faculty
                5, // Staff
                6  // Admin
            ].includes(user.role_id);



        // Faculty and Staff only
        case "FACULTY_STAFF":

            if (!user) {
                return false;
            }

            return [
                4, // Faculty
                5,  // Staff
                6 // Admin (but we don't have admin??)
            ].includes(user.role_id);



        // Admin only
        case "ADMIN":

            if (!user) {
                return false;
            }

            return user.role_id === 6;



        default:
            return false;
    }
}
