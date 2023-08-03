
<Route element={<NavbarLayout />}>
{/* Routes protected by FreePaid Guard */}
<Route element={<FreePaidGuard />}>
  <Route path="/upload" element={<Upload />} />
  <Route path="/upload-multi" element={<UploadMulti />} />
  <Route
    path="/users/:userId/resumes/:resumeId"
    element={<Resume />}
  />
  <Route
    path="/users/:userId/resumes"
    element={<UserResumes />}
  />
  <Route path="/userdetails" element={<UserDetails />} />
</Route>

{/* // Admin Routes */}
<Route element={<AdminGuard />}>
  <Route path="/admin/resumes" element={<AdminManageResumes />} />
</Route>
</Route>
