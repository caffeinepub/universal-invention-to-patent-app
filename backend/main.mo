import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import List "mo:core/List";

actor {
  type InventionStatus = {
    #draft;
    #inReview;
    #readyToSubmit;
    #submitted;
  };

  type ProjectId = Nat;

  type AIAnalysis = {
    noveltyChecklist : [Text];
    suggestions : [Text];
    readinessScore : Nat;
  };

  type InventionProject = {
    id : ProjectId;
    title : Text;
    ownerId : Text;
    problem : Text;
    solution : Text;
    features : Text;
    claims : Text;
    status : InventionStatus;
    aiAnalysis : ?AIAnalysis;
    createdAt : Int;
    updatedAt : Int;
  };

  type InventionProjectInput = {
    title : Text;
    ownerId : Text;
    problem : Text;
    solution : Text;
    features : Text;
    claims : Text;
    status : InventionStatus;
    aiAnalysis : ?AIAnalysis;
  };

  var nextProjectId = 0;

  let projects = Map.empty<ProjectId, InventionProject>();

  module InventionProject {
    public func compareByUpdatedAt(a : InventionProject, b : InventionProject) : Order.Order {
      if (a.updatedAt < b.updatedAt) {
        #less;
      } else if (a.updatedAt > b.updatedAt) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  // Create new project
  public shared ({ caller }) func createProject(input : InventionProjectInput) : async ProjectId {
    let projectId = nextProjectId;
    nextProjectId += 1;

    let now = Time.now();

    let newProject : InventionProject = {
      id = projectId;
      title = input.title;
      ownerId = input.ownerId;
      problem = input.problem;
      solution = input.solution;
      features = input.features;
      claims = input.claims;
      status = input.status;
      aiAnalysis = input.aiAnalysis;
      createdAt = now;
      updatedAt = now;
    };

    projects.add(projectId, newProject);
    projectId;
  };

  // Update existing project
  public shared ({ caller }) func updateProject(projectId : ProjectId, input : InventionProjectInput) : async () {
    switch (projects.get(projectId)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?existingProject) {
        let updatedProject : InventionProject = {
          id = projectId;
          title = input.title;
          ownerId = input.ownerId;
          problem = input.problem;
          solution = input.solution;
          features = input.features;
          claims = input.claims;
          status = input.status;
          aiAnalysis = input.aiAnalysis;
          createdAt = existingProject.createdAt;
          updatedAt = Time.now();
        };
        projects.add(projectId, updatedProject);
      };
    };
  };

  // Get project by id
  public query ({ caller }) func getProject(projectId : ProjectId) : async InventionProject {
    switch (projects.get(projectId)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) { project };
    };
  };

  // Get all projects
  public query ({ caller }) func getAllProjects() : async [InventionProject] {
    let results = List.empty<InventionProject>();
    for ((_, project) in projects.entries()) {
      results.add(project);
    };
    results.toArray();
  };

  // Get projects by status
  public query ({ caller }) func getProjectsByStatus(status : InventionStatus) : async [InventionProject] {
    let results = List.empty<InventionProject>();
    for ((_, project) in projects.entries()) {
      if (project.status == status) {
        results.add(project);
      };
    };
    results.toArray();
  };

  // Delete project
  public shared ({ caller }) func deleteProject(projectId : ProjectId) : async () {
    projects.remove(projectId);
  };

  // Get most recently updated project
  public query ({ caller }) func getMostRecentlyUpdatedProject() : async ?InventionProject {
    if (projects.size() == 0) {
      return null;
    };

    var mostRecent : ?InventionProject = null;

    for ((_, project) in projects.entries()) {
      switch (mostRecent) {
        case (null) { mostRecent := ?project };
        case (?current) {
          if (project.updatedAt > current.updatedAt) {
            mostRecent := ?project;
          };
        };
      };
    };
    mostRecent;
  };
};
