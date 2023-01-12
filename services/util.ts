export const getCurrentYear = () => {
  const today = new Date()

  return today.getFullYear()
}

export const getExperience = () => {
  const today = new Date()

  return today.getFullYear() - 2020
}

// function to get number of github projects from github api and return it
export const getGithubProjects = async () => {
  const res = await fetch('https://api.github.com/users/Jayden1905/repos')
  const data = await res.json()

  return data.length
}
