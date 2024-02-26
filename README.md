# Backache-Team-Dentist-Booking

## Setup Project

1. Clone this repository
```ssh
git clone https://github.com/xXpeira12/Backache-Team-Dentist-Booking.git
```
&emsp; and then
```
cd Backache-Team-Dentist-Booking
```
2. Create a new branch
```
git checkout -b {what_doing}
```
 &emsp; for example
```
git checkout -b setup_project
```
3. Setup and Install node package manager
```
npm init
npm install
```
4. create config.env in Config folder
 
 &emsp; ![Screenshot 2024-02-23 234319](https://github.com/xXpeira12/Backache-Team-Dentist-Booking/assets/78487961/8ff6e2fc-7428-4acd-8fae-6cfff93a8951)
 
5. Doing your assignments
   - `git status` you can displays the state of the working directory and the staging area. It lets you see which changes have been staged, which haven't, and which files aren't being tracked by Git 
6. Stage and commit your changes
```
git add .
```
```
git commit -m "<your commit message>"
```
```
git push -u origin {your_branch}
```
 &emsp; for example
```
git commit -m "Setup Project"
git push -u  origin setup_project
```
7. Create a pull request

 &emsp; ![Screenshot 2024-02-23 232851](https://github.com/xXpeira12/Backache-Team-Dentist-Booking/assets/78487961/f30eb8f2-13fd-4b85-8420-95d8ac4603c0)
 &emsp; ![Screenshot 2024-02-23 232858](https://github.com/xXpeira12/Backache-Team-Dentist-Booking/assets/78487961/91ddf41d-a2d8-4512-bda7-804efe0d3f8e)

# Update Project
 &emsp; If the current branch is behind the remote. First we'll update your local master branch. Go to your local project and check out the branch you want to merge into (your local master branch).
```
git checkout main
```
```
git pull origin main
```
 &emsp; If it already up to date, Check out the branch you want to merge into.
```
git checkout {your_branch}
git merge main
```
 &emsp; for example
```
git checkout setup_project
git merge main
```
- If Git can't automatically merge the changes, it will stop and indicate that there are conflicts. Open the conflicted files in your text editor.
- Inside the files, Git marks the conflicting sections. It typically looks like this:
```
<<<<<<< HEAD
// Your changes
=======
// Incoming changes
>>>>>>> new_changes
```
 &emsp; and then, push to your branch.
```
git push origin {your_branch}
```
 &emsp; for example
```
git push origin setup_project
```
